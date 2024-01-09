const express = require('express');
const Book = require('../../Schema/bookSchema');
const validateUser = require('../../lib/validateUser');
const SubArea = require('../../Schema/SubAreaSchema');
const Slot = require('../../Schema/slotSchema');
const Area = require('../../Schema/AreaSchema');
const router = express.Router();

router.post("/", validateUser, async (req, res) => {
    const { person } = req.body;
    const books = await Book.find();
    let array = [];
    try {
        const myLoop = books.map(async(book, _) => {
            const tempBook = book?.array?.find(item => item?.person === person);
            if (tempBook) {
                const slotData = await Slot.findOne({ 'array._id': book?.parentId });
                const slotItemData = slotData.array?.find(item => item?._id == book?.parentId);
                const subAreaData = await SubArea.findOne({ 'array._id': slotData.parentId });
                const subAreaItemData = subAreaData.array?.find(item => item?._id == slotData?.parentId);
                const areaData = await Area.findOne({ _id: subAreaData.parentId });
                let data = {
                    area: areaData?.name,
                    subArea: subAreaItemData?.name,
                    slotNo: slotItemData?.no,
                    slotQuantity: slotItemData?.quantity,
                    bookstarttime: tempBook?.bookstarttime.replace('T', ' ').slice(0, tempBook?.bookstarttime?.length-9),
                    booklasttime: tempBook?.booklasttime.replace('T', ' ').slice(0, tempBook?.bookstarttime?.length-9)
                };
                array.push(data);
            }
        })
        Promise.all(myLoop).then(async() => {
            if ( await array.length > 0) {
                return res.status(200).json( await array);
            } else {
                return res.status(200).json([]);
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;