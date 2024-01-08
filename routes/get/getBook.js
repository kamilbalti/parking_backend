const express = require('express');
const Book = require('../../Schema/bookSchema');
const validateUser = require('../../lib/validateUser');
const router = express.Router();

router.post("/", validateUser, async(req, res) => {
    Book.findOne({parentId: req?.body?._id}).then((data) => {
        return res?.status(201)?.json(data)
    }).catch((err) => console.log('Error', err))
})

module.exports = router