const express = require('express');
const htmlPdf = require('html-pdf');
const app = express.Router();
const Power = require("../model/power")
const Maintenance = require("../model/Maintenance")
const IT = require('../model/ITDailyReport');
const Studio = require('../model/studio')
const ejs = require('ejs');
const path = require("path");
const authController = require('./authController');

app.get("/report", authController, function (req, res) {
    res.render('./report/report.ejs', { user : req.user})
})

app.get('/generate-report', authController, async (req, res) => {
    const { startDate, endDate, reportType, Category } = req.query;

    if (!startDate || !endDate || !Category) {
        return res.status(400).send('All fields are required!');
    }

    try {
        // Convert string dates to Date objects for querying
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // To include the entire end date

        let data;
        switch (Category.toLowerCase()) {
            case 'power':
                data = await Power.find({ createdAt: { $gte: start, $lte: end } });
                break;
            case 'studio':
                data = await Studio.find({ createdAt: { $gte: start, $lte: end } });
                break;
            default:
                return res.status(400).send('Invalid category selected');
        }

        // Render the report HTML with the fetched data
        res.render('./report/viewreport.ejs', { category: Category, data, startDate, endDate,  user : req.user });
    } catch (error) {
        res.status(500).send('Error generating report: ' + error.message);
    }
});
module.exports = app;