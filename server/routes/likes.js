const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

router.get('/', (req,res) => {
    Like
        .find()
        .then(likes => {
            res.status(200).json(likes)
        });
});

router.post('/', (req,res) => {
    
})

module.exports = router;