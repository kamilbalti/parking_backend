const express = require('express')
const Area = require("../../Schema/AreaSchema")
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const { name } = req.body
        const temp = await Area.findOne({ name })
        if (await temp) {
            return res.status(401).json("Area already exists")
        }
        const area = new Area({ name, slotQuantity: 0, areaQuantity: 0 })
        await area.save()
        return res.status(201).json(area)
    }
    catch (err) {
        return res.status(500).json(err)
    }
})
module.exports = router