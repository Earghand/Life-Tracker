const express = require("express")
const router = express.Router()

router.post("/login", async(req,res,next) => {
    try {
        //take users email and password and attempt to authenticate them
    } catch (error) {
        next(err)
    }
})

router.post("/register", async(req,res,next)=> {
    try {
        //take the users email, password, rsvp status, and the number of guests
        //create a new user in our database
    } catch (error) {
        next(error);
    }
})


router.post()

module.exports = router