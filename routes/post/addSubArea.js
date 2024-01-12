const express = require('express');
const Slot = require('../../Schema/slotSchema');
const SubArea = require('../../Schema/SubAreaSchema');
const Area = require('../../Schema/AreaSchema');
const router = express.Router();


router.post("/", async (req, res) => {
    let subArea;
    try {
        const { areaName, subName, slots } = req.body
        let totalSlot = parseInt(slots);
        let area = await Area.findOne({ name: areaName });
        let parentId = area?.id;
        subArea = await SubArea.findOne({ parentId: parentId });
        if (subArea) {
            let tempSubAreaChild = subArea?.array ? subArea?.array.find((item) => item.name == subName) : false;
            if (tempSubAreaChild)
                return res.status(401).json('Error: Place Already Exist')

                area.areaQuantity = subArea?.array?.length + 1
                area.slotQuantity = area?.slotQuantity + totalSlot
                await area.save()
                subArea.quantity += totalSlot
                subArea?.array?.push({ name: subName, quantity: totalSlot, bookQuantity: 0 })
                await subArea.save()
        }
        else {
            let array = [{ name: subName, quantity: slots, bookQuantity: 0 }]
            subArea = await new SubArea({ parentId: parentId, quantity: totalSlot, array: array })
            await subArea.save()
            area.areaQuantity = area?.areaQuantity + 1
            area.slotQuantity = area?.slotQuantity ? area?.slotQuantity + totalSlot : totalSlot
            await area.save()
        }
            let slot = await new Slot({
                parentId: subArea?.array[0]?._id, quantity: 0,
                array: [{ no: 1, quantity: 0 }]
            })
            if(totalSlot >= 2)
            for (let i = 2; i <= totalSlot; i++) {
                    slot.array.push({ no: i, quantity: 0 })
            }
            await slot?.save()
        return res.status(200).json(area)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})
module.exports = router