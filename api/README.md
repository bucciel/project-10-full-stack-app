
Elise Bucciarelli, Treehouse FSJS Techdegree Project 9: REST API

This project is a REST API created by using Express. The API gives users a way to administer a school database that has course information. The users can interact with this database by retrieving a full list of courses, along with adding, updating, and removing courses. Users are required to create an account and log-in in order to make changes to the database. 

"Exceeds expectations" requirements:
- The GET api/users route filters out the following properties: password, crreatedAt, and updatedAt
- The GET /api/courses and /api/courses/:id routes filter out the following properties: createdAt and updatedAt
- The PUT /api/courses/:id and DELETE /api/courses/:id routes return a 403 status code if the current user doesn't own the requested course
- The POST /api/users route validates that the provided email address is a valid email address and isn't already associated with an existing user

## Overview of the Provided Project Files

* The `seed` folder contains a starting set of data for your database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create your app's database and populate it with data (we'll explain how to do that below).
* We've included a `.gitignore` file to ensure that the `node_modules` folder doesn't get pushed to your GitHub repo.
* The `app.js` file configures Express to serve a simple REST API. We've also configured the `morgan` npm package to log HTTP requests/responses to the console. You'll update this file with the routes for the API. You'll update this file with the routes for the API.
* The `nodemon.js` file configures the nodemon Node.js module, which we are using to run your REST API.
* The `package.json` file (and the associated `package-lock.json` file) contain the project's npm configuration, which includes the project's dependencies.
* The `RESTAPI.postman_collection.json` file is a collection of Postman requests that you can use to test and explore your REST API.

## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.
```
npm install
```

Second, seed the SQLite database.
```
npm run seed
```

And lastly, start the application.
```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).
