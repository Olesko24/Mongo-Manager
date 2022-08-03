![Banner](/docs/mongo-manager-banner.png)

# Mongo Manager

## Table of Contents

1. About Mongo Manager
2. Installation
   1. Requirements
   2. Download & Setup
   3. Config Files
3. Used Packages

## 1. About Mongo Manager

Mongo Manager is a Tool, more precisely a Web-Server to interact with your local MongoDB with CRUD-Operations.

In my case im using it on a Ubuntu Server 18.04 VM because the server image got no GUI to display the data from the database.

From my experience it is especially hard to update specific fields on database elements with the [Mongo Shell](https://docs.mongodb.com/manual/reference/program/mongo/) so i ended up building this project.

The only alternative i could find (and what im using on my local machine) is [MongoDB Compass](https://www.mongodb.com/try/download/compass).

The MongoDB Compass application has the same CRUD-Operations as my Mongo Manager.

In MongoDB Compass it is possible to connect to a database by SSH but in my case it wasnt working. There isnt also a lot of support or questions on the internet about the Compass so i ended up failing.

## 2. Installation

In this section i will show you how to install and setup the Mongo manager to work properly on your machine.

### 2.1 Requirements

- [Node](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [PM2](https://pm2.keymetrics.io/)

### 2.2 Download & Setup

1.  Clone this repository with git on your local machine.
2.  Run `npm i` in the root folder.
3.  Create the config files from 2.3

### 2.3 Config Files

- `frontend/src/config.ts`

  Instead of `localhost` you are entering the ip-address of your machine.

```ts
export var api: string = 'http://localhost:3355';
```

- `backend/src/config.ts`

  This file wile be cloned by cloning the repository so this action is situational.

  If you want you can change the port of the backend if some different application is already using this port.

  **Important: if you change the backend port you also have to change it in the `frontend/src/config.ts` file!**

```ts
export var port: number = 3355;
export var mongoURI: string = 'mongodb://localhost:27017';
```

### 2.4 Start

Open a new terminal in the root folder and run the following command:

#### Development

```bash
npm run dev
```

#### Production

```bash
npm run build
```

*Make sure you have [PM2](https://pm2.keymetrics.io/) installed.*

## 3. Used Packages

### General

[package.json](./package.json)

 - [npm-run-all](https://www.npmjs.com/package/npm-run-all)
 - [PM2](https://www.npmjs.com/package/pm2)

### Frontend

[frontend/package.json](frontend/package.json)

 - [Vue](https://www.npmjs.com/package/vue)
 - [Vuex](https://www.npmjs.com/package/vuex)
 - [Vuetify](https://vuetifyjs.com/en/)
 - [Vue Router](https://router.vuejs.org/)
 - [Fontawesome Icons (Free)](https://fontawesome.com/v5.15/icons?d=gallery&m=free)

### Backend

[backend/package.json](backend/package.json)

 - [Express](https://expressjs.com/de/)
 - [MongoDB](https://www.npmjs.com/package/mongodb)
 - [Lodash](https://www.npmjs.com/package/lodash)
 - [Helmet](https://www.npmjs.com/package/helmet)
 - [Cors](https://www.npmjs.com/package/cors)
 - [Body-Parser](https://www.npmjs.com/package/body-parser)
 - [Gulp](https://gulpjs.com/)
 - [Winston](https://www.npmjs.com/package/winston)
 - [Date-fns](https://www.npmjs.com/package/date-fns)

 ## 4. Limitations

 There are columns that you cant edit because they are read-only by default:

  - _id
  - createdAt
  - updatedAt
  - __v