const express = require('express');
const router = express.Router();
const User = require('../models').User;
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');

/* user authentication middleware */
const authenticateUser = async (req, res, next) => {
    let message;
    const credentials = auth(req);      // parse the user's credentials from the Authorization header
    if (credentials) {      // if the user's credentials are available...
        const user = await User.findOne({     // find user through matching email
            raw: true,
            where: {
                emailAddress: credentials.name,
            },
        });
        if (user) {      // if a user was successfully retrieved from the data store...
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);    // use the bcryptjs npm package to compare the user's password (from the Authorization header) to the user's password that was retrieved from the data store
            if (authenticated) {        // if the passwords match...
                console.log(`Authentication successful for username: ${user.firstName} ${user.lastName}`);  // then store retrieved user object on the request object so any middleware functions that follow this middleware function will have access to the user's information
                if (req.originalUrl.includes('courses')) {
                    req.body.userId = user.id;
                } else if (req.originalUrl.includes('users')) {
                    req.body.id = user.id;
                }
            } else {
                message = `Authentication failure for username: ${user.firstName} ${user.lastName}`;
            }
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {  // if user authentication failed...
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });  // return a response with a 401 Unauthorized HTTP status code
    } else {
        next();     // or if user authentication succeeded, call the next() method
    }
};

/* GET handler api/users 200 - returns the current authenticated user */
router.get('/users', authenticateUser, async (req, res) => {
    const user = await User.findByPk(
        req.body.id,
        {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],    // filters out select user attributes
            },
        }
    );
    res.json(user);
});

/* POST handler for creating new users */
router.post('/users', async (req, res, next) => {
    try {
        const user = req.body;      // Get the user from the request body
        if (user.password && user.firstName && user.lastName && user.emailAddress) {
            user.password = bcryptjs.hashSync(user.password);       // if these fields exist, hash the new user's password

            await User.create(user)       // validation for creating new user
            res.location('/');            // set location header to "/"
            res.status(201).end();        // if user is successfully created, return 201 status
        } else {
            res.status(400).end();        // if user can't be created, return 400 status
        }
    } catch (err) {
        if (err.name === 'This email address already exists.') {      // if email address already exists, don't allow new user to be created
            console.log('Validation error')
            res.status(400).json({
                message: 'This email address already exists.'
            });
        } else {
            console.log('Error 500 - Internal Server Error')
            next(err);
        }
    }
});

module.exports = router;