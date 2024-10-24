const Overall = require("../models/Overall");

module.exports.getSales = async (req, res) => {
    try {
        const overallStats = await Overall.find();

        res.status(200).json(overallStats);

    } catch (err) {
        console.error(err);
        res.status(404).json({message: err.message});
    }
}