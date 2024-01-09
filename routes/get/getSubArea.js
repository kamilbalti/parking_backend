const express = require('express');
const SubArea = require('../../Schema/SubAreaSchema');
const validateUser = require('../../lib/validateUser');
const router = express.Router();

router.post("/", validateUser ,async (req, res) => {
    SubArea.findOne({parentId: req?.body?._id}).then((data) => {
        return res?.status(200)?.json(data)
    })
})

module.exports = router