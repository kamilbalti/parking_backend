const express = require('express')
const User = require('../../Schema/UserSchema');
const validateUser = require('../../lib/validateUser');

const router = express.Router();
router.get("/", validateUser, async (_, res) => {
    User.find().then((data) => res.json(data))
})
module.exports = router