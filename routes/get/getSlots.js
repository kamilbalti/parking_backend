const express = require('express');
const Slot = require('../../Schema/slotSchema');
const validateUser = require('../../lib/validateUser');
const router = express.Router();

router.post("/", validateUser,  async (req, res) => {
    Slot.findOne({parentId: req?.body?._id}).then((data) => {
        return res?.status(201)?.json(data)
    })
})

module.exports = router