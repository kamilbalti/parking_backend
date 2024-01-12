const express = require('express')
const Area = require("../../Schema/AreaSchema")
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const { name } = req.body
        let area = await Area.findOne({ name })
        if (area) {
            return res.status(500).json("Area already exists")
        }
        area = new Area({ name, slotQuantity: 0, areaQuantity: 0 })
        await area.save()
        return res.status(200).json(area)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})
module.exports = router