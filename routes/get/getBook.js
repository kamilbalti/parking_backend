const express = require('express');
const Book = require('../../Schema/bookSchema');
const validateUser = require('../../lib/validateUser');
const router = express.Router();

router.post("/", validateUser, async(req, res) => {
    Book.findOne({parentId: req?.body?._id}).then((data) => {
        data?.array?.map((item, index) => {
            item.bookstarttime = item?.bookstarttime.replace('T', ' ').slice(0, item?.bookstarttime?.length-9)
            item.booklasttime = item?.booklasttime.replace('T', ' ').slice(0, item?.booklasttime?.length-9)
        })
        return res?.status(200)?.json(data)
    }).catch((err) => console.log('Error', err))
})

module.exports = router