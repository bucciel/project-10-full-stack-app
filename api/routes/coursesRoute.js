const express = require('express');
const router = express.Router();
const Course = require('../models').Course;
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

/* GET handler for /api/courses 200 */
router.get('/courses', (req, res) => {
    Course.findAll({
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'],
        include: [{             // adds user information to each course
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'emailAddress']
        }]
    }).then(courses => {
        res.json(courses)
    })
});

/* GET handler for /api/courses/:id 200 */
router.get('/courses/:id', (req, res, next) => {
    Course.findOne({                    // returns the course (including the user that owns the course) for the provided course ID
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'],
        include: [{                    // adds select user information to each course
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'emailAddress']
        }]
    }).then((course) => {
        if (course) {
            res.status(200).json({ course });       // if course is successfully located, return 201 status  
        } else {
            const err = new Error(`Could not find a course that matches the id: ${req.params.id}`);
            err.status = 400;         // if course cannot be located, return 400 status
            next(err);
        }
    })
})

/* POST handler for /api/courses/:id 201 */
router.post('/courses', async (req, res, next) => {
    try {
        if (req.body.title && req.body.description) {               // if the title and description aren't left empty, post new course
            const createCourse = await Course.create(req.body);     // validation for creating new course
            res.location(`/api/courses/${createCourse.id}`);        // sets location header to URI for the course
            res.status(201).end();                                  // if course is successfully created, return 201 status                                 
        } else {
            const err = new Error('Missing information')
            err.status = 400;                                       // if title or description are left empty, return 400 status
            next(err);
        }
    } catch (err) {
        console.log('Error 401 - Unauthorized Request');            // if course cannot be created, return 401 status
        next(err);
    }
});

/* PUT handler for /api/courses/:id 204 */
router.put('/courses/:id', async (req, res, next) => {
    try {
        let course = await Course.findByPk(req.params.id);         // validation for updating course
        if (course.userId === req.body.userId) {                   // if user owns course, they can update the course info
            if (req.body.title && req.body.description) {
                course.title = req.body.title;
                course.description = req.body.description;
                course.estimatedTime = req.body.estimatedTime;
                course.materialsNeeded = req.body.materialsNeeded;
                course = await course.update(req.body);
                res.status(204).end();                             // if course is successfully updated, return 204 status  
            } else {
                const err = new Error('Missing information')
                err.status = 400;                                  // if title or description are left empty, return 400 status
                next(err);
            }
        } else {
            const err = new Error('You don\'t have permission to update this course.')
            err.status = 403;                                      // if user doesn't own course, return 403 status
            next(err);
        }
    } catch (err) {
        console.log('Error 401 - Unauthorized Request');        // if course cannot be updated, return 401 status
        next(err);
    }
});

/* DELETE handler for /api/courses/:id 204 */
router.delete("/courses/:id", async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    if (course.userId) {                    // if user owns course, they can delete it
        await course.destroy();
        res.status(204).end();
    } else {
        const err = new Error('You don\'t have permission to delete this course.')
        err.status = 403;                                       // if user doesn't own course, return 403 status
        next(err);
    }
});

module.exports = router;