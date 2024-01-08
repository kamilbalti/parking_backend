const mongoose = require('mongoose')
// const SubAreaSchema = new mongoose.Schema({
//     subArea: {
//         oneOf: [
//             { type: {} },
//             {
//                 name: { type: String
//                     // , unique: true 
//                 },
//                 slots: [
//                     { type: [] },
//                     {
//                     no: { type: Number },
//                     book: { type: String }
//                 }]
//             }
//         ]}
// })
const AreaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    areaQuantity: {type: Number},
    slotQuantity: {type: Number}
}, { timestamps: true })
const Area = mongoose.model("Area", AreaSchema)
module.exports = Area