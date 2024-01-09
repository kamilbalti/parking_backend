const express = require('express');
const Slot = require('../../Schema/slotSchema');
const validateUser = require('../../lib/validateUser');
const router = express.Router();

router.get("/", validateUser, async(_, res) => {
    Slot.find().then((data) => {
        return res?.status(200)?.json(data)
    }).catch((err) => console.log('Error', err))
})

module.exports = router