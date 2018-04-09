const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
let dbUser = null;

router.get('/', (req,res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/:id', (req,res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req,res) => {
    Blog
        .find()
        .where({'featured': true})
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.post('/', (req,res) => {
    User
        .findById(req.body.authorId)
        .then(user => {
            dbUser = user;
            var blog = new Blog(req.body);
            blog.author = user._id;
            return blog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);
            dbUser.save().then(() => res.status(201).json(blog));
        });
});

router.put('/:id', (req,res) => {
    Blog
        .findByIdAndUpdate(req.params.id,req.body)
        .then(blog => {
            res.status(200).json(blog)
        });
});

router.delete('/:id', (req,res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(blog => {
            res.status(200).json(blog)
        });
});

module.exports = router;
