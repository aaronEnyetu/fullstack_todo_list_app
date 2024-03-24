# Fullstack Todo List

Fullstack Todo List Project: a usable Todo List application with user authentication, error handling, data validation and logging

## Features
```
Authentication
Add todos
Track todos
Categorize todos
```

## Getting Started

Clone [this repo](https://github.com/aaronEnyetu/fullstack_todo_list_app) for this deliverable.
cd into fullstack_todo_list_app


## Requirements

Make sure you have the following installed in your system:
```
   Node 
   Nest JS
   PostgresSQL
   Postman
```

## Backend Setup

cd into api folder from the root of the entire project:
cd api

Install node modules:
npm install

Configure the .env variables, take a look at .env.copy file to see the structure of env vars and create an .env file at the api root folder that has the exact env vars with exact same name with your credentials:

Make sure you have setup your PostgreSQL and have a names database in the server.

Run the development server:

npm run start:dev --watch  // localhost:3005


NOTE: If you are creating the backend API from scratch make sure you run the following: 

```
   npm i -g @nestjs/cli
   nest new api
```

## Frontend Setup
cd into frontend folder from root of the entire project:
cd frontend

Install node modules:
npm install

run the frontend:
npm run start // localhost:3000

Note: If you are creating a frontend from scratch use the following command:

```
npx create-react-app frontend --template typescript
```

## Migrations
When you change, add, or delete a table, run migrations from package.json

1. To name migration, add migraiton name at end of npm run migration:generate string: e.g. npm run typeorm -- -d ./src/config/typeorm.ts migration:generate ./src/migrations/[add-migration-name-here].
2. One generated, you should run the migration npm run migration:run
3. Then, to polish, re:run npm run build.

### Installing Packages and Libraries

```
   Chakra UI - npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
   npm install
```

### Developer Tasks

```
   1. Frontend and Backend Creation and Connection
   2. Database Creation and Connection
   3. Database Migration Set-up
```

| Frontend Tasks                                                                                       |     |
| :--------------------------------------------------------------------------------------------------- | --: |
| Set basic router up with React Router                                                                |   🗸 |
| Set up Chakra UI                                                                                     |   🗸 |
| Created test button that pings the test route on the backend                                         |   🗸 |
| Successfully can POST object to the database                                                         |   🗸 |

| Backend Tasks                                                                                        |     |
| :--------------------------------------------------------------------------------------------------- | --: |
| Added postgres to NestJS API                                                                         |   🗸 |
| Created test entity                                                                                  |   🗸 |
| Created database migration commands (migration generate & run)                                       |   🗸 |
| Set up access to Name table in the NestJS service                                                    |   🗸 |
| Created a .env file with database set up variables                                                   |   🗸 |
| Created a .env.copy file to show what variables are needed in the .env file                          |   🗸 |
| Created a .gitignore file that ignores the .env file                                                 |   🗸 |
| Set up test route and verified it works as intended                                                  |   🗸 |
