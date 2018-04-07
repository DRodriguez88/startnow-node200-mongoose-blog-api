const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req,res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req,res) => {
    User   
        .findById(req.params.id)
        .then(users => {
            res.status(200).json(users);
        });
});

router.post('/', (req,res) => {
    var user = new User(req.body);
    user
        .save()
        .then(users => {
            res.status(200).json(users);
        });
});

router.put('/:id', (req,res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then(users => {
            res.status(200).json(users);
        });
});

router.delete('/:id', (req,res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(users => {
            res.status(200).json(users);
        })
})


module.exports = router;