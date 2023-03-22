import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { exit } from 'process';
import { Address } from './dto/user-address.dto';
import { Payment } from './dto/user-payment-info.dto';
import { UserDetails } from './user-details.interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>
    ) {}

    _getUserDetails(user: UserDocument): UserDetails {
        return {
            id: user._id,
            type: user.type,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            homeAddress: user.homeAddress,
            paymentInfo: user.paymentInfo,
            phoneNumber: user.phoneNumber,
            isSubscribed: user.isSubscribed,
            isActive: user.isActive
        };
    }

    async create (
        type: string,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        homeAddress: Address,
        paymentInfo: Payment[],
        password: string,
        isSubscribed: boolean,
        isActive: boolean,
        activationCode: string
    ): Promise<UserDocument> {
        const newUser = new this.userModel({
            type,
            firstName,
            lastName,
            email,
            phoneNumber,
            homeAddress,
            paymentInfo,
            password,
            isSubscribed,
            isActive,
            activationCode
        })
        return newUser.save();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async changePassword(email: string, newPassword: string): Promise<UserDocument> {
        const existingUser = await this.findByEmail(email);
        if (!existingUser) throw new HttpException('Unable to find resource.', HttpStatus.NOT_FOUND);
        if (existingUser.password === newPassword) throw new HttpException('You have already used this password.', HttpStatus.BAD_REQUEST);
        existingUser.password = newPassword ?? existingUser.password;
        return existingUser.save();
    }

    async updateUserProfile(
        email: string,
        newFirstName: string,
        newLastName: string,
        newPhoneNumber: string,
        newHomeAddress: Address,
        newIsSubscribed: boolean
    ) : Promise<UserDetails | any> {
        const existingUser = await this.findByEmail(email);
        if (!existingUser) throw new HttpException('Unable to find resource.', HttpStatus.NOT_FOUND);
        existingUser.firstName = newFirstName;
        existingUser.lastName = newLastName;
        existingUser.phoneNumber = newPhoneNumber;
        existingUser.homeAddress = {...newHomeAddress};
        existingUser.isSubscribed = newIsSubscribed;
        return existingUser.save();
    }

    async activateUser(email: string) {
        const existingUser = await this.findByEmail(email);
        if (!existingUser) throw new HttpException('Unable to find resource.', HttpStatus.NOT_FOUND);
        existingUser.isActive = true;
        return existingUser.save();
    }

}
