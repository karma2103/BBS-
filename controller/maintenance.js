const express = require('express');
const MaintenanceSchema = require("../model/Maintenance");
const authController = require('./authController');
const app = express.Router();

app.get("/maintenance", authController, function (req, res) {
    res.render('./maintenance/maintenance/maintenance.ejs',  { user : req.user})
})

app.post("/CreateMaintenance",async (req, res) => {
    try {
        const maintenance = new MaintenanceSchema({
            todaysEvent : req.body.todaysEvent,
            regularWork : req.body.regularWork,
            specialComment: req.body.specialComment,
            morning: req.body.morning,
            evening : req.body.evening
        });
        const main = await maintenance.save();
        res.redirect("/");
    } catch (error) {
        console.error("Error in Maintenance Work report:", error);
        res.status(500).json({ error: "An error occurred while creating a maintenance Work." })
    }
})

app.get('/viewMaintenanceReport', authController, async (req, res) => {
    try {
        const m = await MaintenanceSchema.find(); 
        res.render('./maintenance/maintenance/viewMaintenance', { m, user : req.user });
    } catch (error) {
        console.error("Error fetching Maintenenace data:", error);
        res.status(500).send("An error occurred while fetching Maintenenace data:.");
    }
  });
// app.get("/power", function (req, res) {
//     res.render('./maintenance/power.ejs')
// })
// app.get("/studio", function (req, res) {
//     res.render('./maintenance/studio.ejs')
// })
// app.get("/transmission", function (req, res) {
//     res.render('./maintenance/transmission.ejs')
// })
module.exports = app;