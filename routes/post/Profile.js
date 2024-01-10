const bcrypt = require('bcrypt')
const User = require('../../Schema/UserSchema');
const router = require("../auth/auth");
const dayjs = require('dayjs');

router.post("/", async (req, res) => {
    const { name, password, email, newPassword } = req.body
    let tempProfile = {}
    let user = await User.findOne({ email: email })
    const passCheck = await bcrypt.compare(password, user.password)

    try {
        if (await name && user.name !== name) {
            user.name = name
            tempProfile.name = name
        }
        if (await newPassword && passCheck) {
            user.password = await bcrypt.hash(newPassword, 8)
            tempProfile.password = await bcrypt.hash(newPassword, 8)
        }
        else if (newPassword)
            return res.status(401).json("User Password is not match \nPlease provide Correct Password")
        console.log( !!tempProfile)
        if (!!tempProfile) {
            // user.updatedAt = dayjs()?.format('YYYY-MM-DD')
            console.log(tempProfile)
            await user.save()
            return res.status(200).json(await user )
        }
        else return res.status(401).json('Profile is not Changed Please fill the fields to update Profile!')
    }
    catch (err) {
        return res.status(500).json(err)
    }
})
module.exports = router