const express = require("express")

const studioSchema = require("../model/studio");
const authController = require("./authController");

const app = express.Router();

app.get('/studio', authController, function(req, res) {
    res.render("./maintenance/studio/studio.ejs",  { user : req.user});
});

app.post('/createStuido', async (req, res) =>{
    try {
        const data = new studioSchema ({
            todaysEvent : req.body.todaysEvent,
            workDone : req.body.workDone,
            SpecialComment : req.body.SpecialComment,
            AironEquiptment : req.body.AironEquiptment,
            postProduction : req.body.postProduction,
        });
        const studio = await data.save();
        res.redirect("/");
    } catch (error) {
        console.error("Error in Studio report:", error);
        res.status(500).json({ error: "An error occurred while creating a Studio." })
    }
})

app.get('/viewStudio', authController, async (req, res) => {
    try {
        const std = await studioSchema.find(); // Fetch all bookings from the database
        res.render('./maintenance/studio/viewStudio', { std, user : req.user });
    } catch (error) {
        console.error("Error fetching studio:", error);
        res.status(500).send("An error occurred while fetching studio.");
    }
  })
  module.exports = app;