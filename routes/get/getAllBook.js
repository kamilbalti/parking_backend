const express = require('express');
const Book = require('../../Schema/bookSchema');
const validateUser = require('../../lib/validateUser');
const router = express.Router();

router.get("/", validateUser, async(_, res) => {
    Book.find().then((data) => {
        return res?.status(201)?.json(data)
    }).catch((err) => console.log('Error', err))
})

module.exports = router