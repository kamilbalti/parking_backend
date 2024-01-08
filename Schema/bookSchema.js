const mongoose = require('mongoose')
const BookItemSchema = new mongoose.Schema({
    person: { type: String },
    bookstarttime: { type: String },
    booklasttime: { type: String },
}, { timestamps: true });  
const BookSchema = new mongoose.Schema({
    parentId: {type: String, required: true},
    array: [BookItemSchema]
}, { timestamps: true })
const Book = mongoose.model("Book", BookSchema)
module.exports = Book