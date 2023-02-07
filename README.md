# Cinema Booking App

Please use this README as a one-stop resource. Outlined below will be guidelines for development work, including best practices for code reviews, git basics, and other general information. 

## Getting Started

This repo contains two source folders, `cinema-booking-client` and `cinema-booking-server`. The client folder contains all front-end related code and can be treated as an independent entity. The server folder, on the other hand, is our middleware. This is where all database logic will be handled, in addition to the logic required to serve our static client folder: `cinema-booking-client`. 

The first thing you should do **anytime** you pull code is run `npm install`. This ensures that you have the most up-to-date package information.

## Git Essentials

Git is an amazing tool for these kinds of projects, and utilizing it effectively will be essential for maintaining our repository. There is only one rule:

***Nobody, under any circumstance, is to push their code directly to the master branch.***

Doing this will most likely break things, and this is why we have code reviews. Everyone is strongly encouraged to provide feedback for others on their code, and the combined efforts of this feedback will result in a higher quality application. 

Because you are not allowed to push directly to the master branch, you must create your own branch, commit your changes, submit a pull request, and respond to feedback. Once your branch has been approved, you can merge your code. 

Please use the below steps as a general outline each time you sit down to make changes:

1. Pull the most recent changes from the master branch: `git pull origin master`
2. If you are not already on your own branch, checkout to a new one by running: `git checkout -b BRANCH_NAME`. You can view your current branch by running `git branch`
3. Make your changes
4. Add the files to be included in your commit, either: `git add -u` or `git add .`
5. Commit your changes to your branch, making sure to use a descriptive commit message: `git commit -m "DESCRIPTIVE_MESSAGE"`
6. Push your changes to your branch: `git push -u origin BRANCH_NAME`
7. Go to github.com and submit a pull request
8. Send teammates a message about your PR and ask for feedback
9. Respond to feedback and update your PR
10. Once approved, merge your code

I (Luke), will be in charge of reviewing any PR's relating to frontend development work, and Evan will be in charge of reviewing PR's for backend related work. Only I or Evan can give approval for PR's. 

## Frontend Development

For frontend development work, there are two methods for starting a local server that you can use depending on the situation.

For basic visual changes that require no API or database logic, run the following commands:

1. `cd cinema-booking-client`
2. `npm install`
3. `npm run start`

Here, you can make your changes and receive real-time feedback thanks to React.js.

For frontend work that requires data or API logic from the backend, you will need to build the client first and then run the server. To do this, run the following:

1. `cd cinema-booking-client`
2. `npm install`
3. `npm run build`
4. `cd ..`
5. `npm run start:dev`

***It is important to note that any changes you make to the client AFTER running these commands will not be reflected visually in your local development***. To see your new frontend changes, you must kill your current local server and run the above commands to restart the application. 

Once the application runs, however, the code has been setup so that our client is served via http://localhost:3000/home. You can use this URL for local development. 

## Backend Development

To run the backend application, simply navigate into the root directory and run `npm run start:dev`.

I will provide information regarding our MongoDB database as soon as I set it up.

# Database
We will run MongoDB with Docker and Docker Compose

[Install with](https://www.mongodb.com/docs/manual/installation/)
## Usage (start server)

`docker-compose.yml` contains the information for starting the server. 

```
// non detach mode
docker-compose up
```
or
```
// detach mode
docker-compose up -d
```

This will spin up the MongoDB latest version (currently 4.x.x version), expose port to host at 27017.

## Usage (stop server)

To shutdown database without remove the container.

```
docker-compose stop
```

To shutdown database and remove the container.
```
docker-compose down
```

Is data or user that already created will gone? 
No, since in the Docker Compose file you can see that we utilize data container named `mongodb_data_container` to store the MongoDB data.

## MongoDB credential (for database `admin`)

- Username: root
- Password: rootpassword

## How to connect to MongoDB

### Via mongo Shell

Type this.

```
mongo admin -u root -p rootpassword
```

It will connect to localhost port 27017.

Note that `mongo` command should be installed on the computer. On Linux this should be install `mongodb-org-shell` only. Refer to this for more detail https://docs.mongodb.com/manual/installation/

## Some quick tips after logged-in

Show databases:
```
show dbs
```

Create new non-existant database:
```
use mydatabase
```

Show collections:
```
show collections
```

Show contents of a collection:
```
db.your_collection_name.find()
```

Save a data to a collection:
```
db.your_collection_name.save({"name":"Sony AK"})
```

Show database version:
```
db.version()
```



```
Step 1: Write a SQL script to populate the DB with:
1. root admin
2. test user
3. test booking
4. test ticket 
5. test movie

Administrator:  id (int) | movie id (int) | user id (int) 
User:           id  (int)  | email (varchar) | name (varchar) | phone number (varchar) | email address (varchar) | password (varchar) |
Booking:        id   (int) | user_id (int)   | ticket_id (int) | movie title  (varchar) | show date (datetime) | time (datetime) | credit card number (TBD)
Ticket:         id  (int) | movie_id (int) | price 
Movie:          id   (int) | movie title  (varchar) |  category (varchar) |  cast (varchar) | director (varchar) | producer (varchar) | synopsis (varchar) | reviews (varchar) | trailer (varchar) | MPAA-US film rating code (TBD) | show dates (datetime) |  times (TBD) |  


Step 2: Create Admin routes
- Create 
- Read
- Update
- Delete

Step 3: Use Admin role to create a user

Step 4: Use Admin role to create a booking

Step 5: Use Admin role to create a ticket

Step 6: Use Admin role to create a movie


Step 7: Write a SQL script to populate the DB with:
1. root admin
2. test user
3. test booking
4. test ticket 
5. test movie
```

```
docker pull mongo
````

```
docker run --name cinemma_db -d mongo:latest
```

```
docker run -it --network localhost --rm mongo mongosh --host cinema_db test
```