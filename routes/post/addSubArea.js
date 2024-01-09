const express = require('express');
const Slot = require('../../Schema/slotSchema');
const SubArea = require('../../Schema/SubAreaSchema');
const Area = require('../../Schema/AreaSchema');
const router = express.Router();


router.post("/", async (req, res) => {
    try{
    const { areaName, subName, slots } = req.body
    let totalSlot = parseInt(slots);
    let area = await Area.findOne({ name: areaName });
    let parentId = area?.id;
    let tempSubArea = await SubArea.findOne({parentId: parentId});
    if( await tempSubArea){
    let tempSubAreaChild = tempSubArea?.array ? tempSubArea?.array.find((item) => item.name == subName) : 
    false;
    console.log( tempSubArea?.array )
    if(!areaName || !slots){
    console.log('No')
    return res.status(401).json('Error: You may forgot to enter the full data')
    }
    if( await tempSubAreaChild){
        console.log('Error: Place Already Exist')
        return res.status(401).json('Error: Place Already Exist')
    }
    else{    
    area.areaQuantity = await tempSubArea?.array?.length+1
    area.slotQuantity = await area?.slotQuantity + totalSlot
    await area.save()
    tempSubArea.quantity += totalSlot
    tempSubArea?.array?.push({name: subName, quantity: totalSlot, bookQuantity: 0})
    await tempSubArea.save()
    for (let i = 1; i <= totalSlot; i++) {
        let array = await tempSubArea?.array
        let tempSlots = await Slot.findOne({parentId: array[array?.length-1]?._id})
        if(i == 1){
            let slot = new Slot({ parentId: array[array?.length-1]?._id, quantity: 0,
            array: [{no: i, quantity: 0}]})
            await slot?.save()
        }
        else{
            tempSlots.array.push({no: i, quantity: 0})
            await tempSlots?.save()
        }
    }
    return res.status(200).json(area)
}}
    else {
    let array = [{name: subName, quantity: slots, bookQuantity: 0}]
    const subArea = new SubArea({ parentId: parentId, quantity: totalSlot, array: array })
    await subArea.save()
    area.areaQuantity = await area?.areaQuantity + 1
    area.slotQuantity = await area?.slotQuantity ? area?.slotQuantity + totalSlot : totalSlot
    await area.save()
    for (let i = 1; i <= totalSlot; i++) {
        if(i == 1) {
            let slot = await new Slot({ parentId: subArea?.array[0]?._id, quantity: 0, 
            array: [{no: i, quantity: 0}]})
            await slot?.save()
        }
        else{
            let tempSlots = await Slot.findOne({parentId: subArea?.array[0]?._id})
            tempSlots.array.push({no: i, quantity: 0})
            await tempSlots?.save()
        } 
    }
    return res.status(200).json(area)
    }

}
catch(err){
    return res.status(500).json(err)
}
})

module.exports = router