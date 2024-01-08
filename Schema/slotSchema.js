const mongoose = require('mongoose')
const SlotItemSchema = new mongoose.Schema({
    no: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, { timestamps: true });
const SlotSchema = new mongoose.Schema({
    parentId: { type: String, required: true },
    quantity: { type: Number },
    array: [SlotItemSchema]
}, { timestamps: true })
const Slot = mongoose.model("Slot", SlotSchema)
module.exports = Slot