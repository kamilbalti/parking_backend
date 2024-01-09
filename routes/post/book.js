const express = require('express');
const dayjs = require('dayjs')
const Slot = require('../../Schema/slotSchema');
const Book = require('../../Schema/bookSchema');
const SubArea = require('../../Schema/SubAreaSchema');
const router = express.Router();

router.post("/", async (req, res) => {
    const { slotObj, slotNo, bookDetail } = req.body
    let slots = await Slot.findOne({ _id: slotObj?._id })
    let subArea;
    if (slots) {
        subArea = await SubArea.find()
        let tempData;
        let temp = await subArea.find((item) => tempData = item?.array?.find((item2) => item2.id == slots.parentId))
        tempData.bookQuantity += 1
        await temp.save()
        const parentId = await slots?.array[slotNo - 1]?._id
        const bookCheck = await Book.findOne({ parentId })
        try {
            let tempCheck;
            if (bookCheck) {
                slots.quantity += 1
                slots.array[slotNo - 1].quantity += 1
                await slots.save()
                await bookCheck?.array.push({ ...bookDetail })
                await bookCheck.save()
                console.log(bookCheck, ' Booking Detail')
                tempCheck = Object?.values(bookCheck?.array)?.filter((item2, index) => {
                        const currentTime = dayjs();
                        const bookingStartTime = dayjs(item2?.bookstarttime);
                        const bookingLastTime = dayjs(item2?.booklasttime);
                        const isBookingValid = (
                                !bookingLastTime.isBefore(currentTime) &&
                            // !bookDetail?.booklasttime.isBefore(currentTime) &&
                            ((!dayjs(bookDetail?.bookstarttime).isBefore(bookingStartTime) &&
                                !dayjs(bookDetail?.bookstarttime).isAfter(bookingLastTime)) ||
                                (!dayjs(bookDetail?.booklasttime).isBefore(bookingStartTime) && !dayjs(bookDetail?.booklasttime).isAfter(bookingLastTime)) ||
                                (!dayjs(bookDetail?.bookstarttime).isAfter(bookingStartTime) && !dayjs(bookDetail?.booklasttime).isBefore(bookingLastTime))
                            )
                        );
                        return !!isBookingValid;
                    });
                if (await !!tempCheck?.length) {
                    return res.status(401).json(`This slot is already booked! \nPlease select other slots`)
                }
                else {
                    return res.status(201).json(slots)
                }
            }
            else {
                const array = [{ ...bookDetail }]
                const book = new Book({ parentId, array })
                await book?.save()
                return res.status(201).json(slots)
            }
        }
        catch (err) {
            return res.status(500).json(err)
        }
    }
})

module.exports = router