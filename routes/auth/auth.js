const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router();
const dotenv = require('dotenv');
const User = require('../../Schema/UserSchema');
const jwt = require('jsonwebtoken');
const { PASSWORD_MIN_LIMIT } = require('../../lib/constant');
dotenv.config({ path: './config.env' })
router.post('/register', async (req, res) => {    
    try {
        const { email, password, name } = req.body
        // console.log(email, password, name)
        const hashedPaswword = await bcrypt.hash(password, PASSWORD_MIN_LIMIT)
        let status = 'User'
        const user = new User({ email, password: hashedPaswword, status, name })
        await user.save()
        const token = jwt.sign({ id: user._id }, "secret")
        const { password2, ...others} = user._doc;
        // user.token = token
        // let tempUser = user
        // tempUser.token = token
        // console.log(token, ' token')
        // console.log(await user, ' user')
        return res.status(200).json({ ...others, token })
    }
    catch (err) {
       return res.status(500).json(err)
    }
})


router.post("/logIn/", async (req, res) => {
    try {
        const { password, email } = req.body
        const user = await User.findOne({  email })
        let passCheck;
        if(user){
        passCheck = await bcrypt.compare(password, user.password)
        // console.log(passCheck, " Password Check")}
        if (!user){
            console.log('error')
            return res.status(401).json("Email Not Found!")}
        else if ( await !passCheck) {
            return res.status(401).json("Wrong Password!")
        }
        else {
            const token = jwt.sign({ id: user._id }, "secret")
            const { password2, ...others } = user._doc;
            return res.status(200).json({ ...others, token })
        }
    }
    catch (err) {
      return res.status(500).json(err)
    }
})

module.exports = router