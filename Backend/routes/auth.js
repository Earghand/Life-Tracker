const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.post("/login", async function(req,res,next)  {
    try {
        const user = await User.login(req.body)
        console.log(user);
        return res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
})

router.post("/register", async function (req,res,next) {
    try {
        console.log("trying to register")
        //take the users email, password, rsvp status
        //create a new user in our database
        const user = await User.register(req.body)
        return res.status(201).json({ user })
    } catch (error) {
        next(error);
    }
})


// router.post()

module.exports = router