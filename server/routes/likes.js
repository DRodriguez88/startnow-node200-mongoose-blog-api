const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
let dbLiker = null;
let dbLike = null;

router.get('/', (req,res) => {
    Like
        .find()
        .then(likes => {
            res.status(200).json(likes)
        });
});

router.post('/', (req,res) => {
    User
        .findById(req.body.liker)
        .then(user => {
            dbLiker = user;
            var like = new Like(req.body);
            like.liker = user._id;
            return like.save()
        })
        .then(like => {
            dbLike = like;
            dbLiker.likes.push(like);
            dbLiker.save().then(() => res.status(201).json(like));
        })
        .then( () => {
            Blog
                .findById(req.body.blogId)
                .then(blog => {
                    blog.likes.push(dbLike);
                    blog.save()
                });
        });
});

module.exports = router;