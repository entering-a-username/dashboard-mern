const Product = require("../models/Product");
const ProductStat = require("../models/ProductStat");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

const getCountryIso3 = require("country-iso-2-to-3");


module.exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (user) {
            res.status(200).json(user);
        }

        res.status(400).json({message: "user not found"});

    } catch (err) {
        console.error(err);
        res.status(404).json({message: err.message});
    }
}

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({role: "user"}).select("-password");
        
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(404).json({message: err.message});
    }
}

module.exports.getAdmins = async (req, res) => {
    try {
        const admins = await User.find({role: "admin"}).select("-password");
        
        res.status(200).json(admins);
    } catch (err) {
        console.error(err);
        res.status(404).json({message: err.message});
    }
}

module.exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        
        const productsWithStats = await Promise.all(
            products.map(async product => {
                const stat = await ProductStat.find({
                    productId: product._id,
                })
                return {
                    ...product._doc,
                    stat,
                }
            })
        );

        res.status(200).json(productsWithStats);
    } catch (err) {
        console.error(err);
        res.status(404).json({message: err.message});
    }
}

module.exports.getGeography = async (req, res) => {
    try {
        const users = await User.find();

        // build an object
        const locations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country);

            // initialize
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }

            acc[countryISO3]++;
            return acc;
        }, {});

        const formattedLocation = Object.entries(locations).map(
            ([country, count]) => {
                return {id: country, value: count};
            }
        )

        res.status(200).json(formattedLocation);
    } catch (err) {
        console.error(err);
        res.status(404).json({message: err.message});
    }
}

module.exports.getTransactions = async (req, res) => {
    // server side pagination
    try {
        const transactions = await Transaction.find();

        const total = await Transaction.countDocuments();

        res.status(200).json({ transactions, total });
    } catch (err) {
        console.error(err);
        res.status(404).json({message: err.message});
    }
}

