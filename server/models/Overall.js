const mongoose = require("mongoose");

const OverallSchema = new mongoose.Schema({
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
        {
            month: String,
            totalSales: Number,
            totalUnits: Number,
        }
    ],
    dailyData: [{
        date: String,
        totalSales: Number,
        totalUnits: Number,
    }],
    salesByCategory: {
        type: Map,
        of: Number,
    }
}, {timestamps: true});

const Overall = mongoose.model("Overall", OverallSchema);

module.exports = Overall;