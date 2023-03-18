import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ShowModule } from './show/show.module';
import { PromotionModule } from './promotion/promotion.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cinema-booking-app'),
    UserModule,
    ShowModule,
    PromotionModule,
    RoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
