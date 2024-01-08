const mongoose = require('mongoose')
const SubAreaSchema = new mongoose.Schema({
    parentId: {type: String, required: true},
    quantity: { type: Number},
    array: [{
        name: { type: String},
        quantity: { type: Number},
        bookQuantity: {type: Number},
    }]
}, { timestamps: true })
const SubArea = mongoose.model("SubArea", SubAreaSchema)
module.exports = SubArea