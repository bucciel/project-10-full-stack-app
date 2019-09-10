'use strict';

/* load modules */
const express = require('express');
const morgan = require('morgan');
const sequelize = require('./models').sequelize;
const homeRoute = require('./routes/homeRoute');
const usersRoute = require('./routes/usersRoute');
const coursesRoute = require('./routes/coursesRoute');

const app = express();    // create the Express app
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';  // variable to enable global error logging

app.use(express.json());  // set request body JSON parsing
app.use(morgan('dev'));   // setup morgan which gives us http request logging

/* api routes */
app.use('/api', homeRoute);
app.use('/api', usersRoute);
app.use('/api', coursesRoute);

app.get('/', (req, res) => res.redirect('/api'));   // redirect to api route

/* sets up friendly greeting for the root route */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

/* send 404 if no other route matched */
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

/* sets up global error handler */
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

app.set('port', process.env.PORT || 5000);    // set port

/* start listening on designated port */
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

/* test the connection to the database */
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
    return sequelize.sync();
  })

  .catch(err => {
    console.error('Unable to connect to the database:",err')
  });

