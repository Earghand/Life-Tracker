const express = require("express");
const Sleep = require("../models/sleep");
const router = express.Router()
const security = require("../middleware/security")


router.post("/", security.requiredAuthenticatedUser, async function(req,res,next)  {
    try {
        // Create a new sleep handler
        const { user } = res.locals
        const sleep = await Sleep.createNewSleep( {user, post: req.body } )
        return res.status(201).json({ sleep })
    } catch (error) {
        next(error)
    }
})


router.get("/", async function(req,res,next)  {
    try {
        const { user } = res.locals
        console.log(user);
        const sleeps = await Sleep.listSleeps(user.email);
        return res.status(200).json({ sleeps })
    } catch (error) {
        next(error)
    }
})
router.get("/week", async function(req,res,next)  {
    try {
        console.log("WEEEK")
        const { user } = res.locals
        console.log(user);
        const avgHours = await Sleep.weekSleep(user.email);
        // console.log("HOURSRSFHWIOJIJ" + avgHours)
        return res.status(200).json({avgHours})
    } catch (error) {
        next(error)
    }
})



router.get("/:sleepId", async function(req,res,next)  {
    try {
        // Fetch single id for sleep
        const { sleepId } = req.params
        const sleep = await Sleep.fetchSleepById(sleepId) 
        return res.status(200).json({ sleep })
    } catch (error) {
        next(error)
    }
})


// router.post()

module.exports = router