const express = require('express')
const Area = require('../../Schema/AreaSchema')
const validateUser = require('../../lib/validateUser')
const router = express.Router()
router.get("/", validateUser, async (_, res) => {
  Area.find().then((data) => res.status(201).json(data))
})
module.exports = router