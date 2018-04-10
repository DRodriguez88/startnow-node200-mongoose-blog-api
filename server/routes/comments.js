const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const Comment = require('../models/Comment');
let dbUser = null;
let dbComment = null;


router.get('/', (req,res) => {
    Comment
        .find()
        .then(comments => {
            res.status(200).json(comments);
        });
});

router.get('/:id', (req,res) => {
    Comment
        .findById(req.params.id)
        .then(comments => {
            res.status(200).json(comments);
        });
});

router.post('/', (req,res) => {
    User
        .findById(req.body.authorId)
        .then(user => {
            dbUser = user;
            var comment = new Comment(req.body);
            comment.author = user._id;
            return comment.save();
        })
        .then(comment => {
            dbComment = comment;
            dbUser.comments.push(comment);
            dbUser.save().then(() => res.status(201).json(comment));
        })
        .then( () => {
            Blog
                .findById(req.body.blogId)
                .then(blog => {
                    blog.comments.push(dbComment);
                    blog.save()
                });
        });
});

router.put('/:id', (req,res) => {
    Comment
        .findByIdAndUpdate(req.params.id,req.body)
        .then(comment => {
            res.status(200).json(comment)
        });
});

module.exports = router;