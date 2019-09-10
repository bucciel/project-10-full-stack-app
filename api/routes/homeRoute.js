const express = require('express');
const router = express.Router();

//GET home route 
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the home page!',
    });
});

module.exports = router;