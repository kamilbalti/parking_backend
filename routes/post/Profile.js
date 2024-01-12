const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router();
const User = require('../../Schema/UserSchema');
// const router = require("../auth/auth");

router.post("/", async (req, res) => {
    const { name, password, email, newPassword } = req.body

    try {
        let user = await User.findOne({ email: email })
        const passCheck = password && await bcrypt.compare(password, user.password)
        if ( password && !passCheck)
            return res.status(401).json("User Password is not match \nPlease provide Correct Password")
        user.name = name && user.name !== name ? name : user.name
        user.password = newPassword && passCheck ? await bcrypt.hash(newPassword, 8) : user?.password
        await user.save()
        return res.status(200).json(user)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
})
module.exports = router