const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Product = require("../models/Product");

// create
module.exports.create = async (req, res) => {
    const { type } = req.params;

    const obj = req.body;
    
    let data;

    if (type === "users") {
        data = {
            name: obj.Name,
            email: obj.Email,
            password: obj.Password,
            city: obj.City,
            state: obj.State,
            country: obj.Country,
            occupation: obj.Occupation,
            phoneNumber: obj.Phone,
            role: "user",
        }

        const user = await User.create(data);
        

        if (user) {
            res.json({created: true});
        }
    } else if (type === "products") {
        data = {
            name: obj.Title,
            description: obj.Description,
            category: obj.Category,
            price: obj.Price,
            stock: obj.Supply,
        }

        const product = await Product.create(data);
        
        if (product) {
             res.json({created: true});
        }
    } else if (type === "transactions") {
        data = {
            name: obj.Title,
            description: obj.Description,
            category: obj.Category,
            price: obj.Price,
            stock: obj.Supply,
        }
        
        const transaction = await Transaction.create(data);
        
        if (transaction) {
            res.json({created: true});
        }
    } else if (type === "admins") {
        data = {
            name: obj.Name,
            email: obj.Email,
            password: obj.Password,
            city: obj.City,
            state: obj.State,
            country: obj.Country,
            occupation: obj.Occupation,
            phoneNumber: obj.Phone,
            role: "superadmin",
        }

        const admin = await User.create(data);

        if (admin) {
            res.json({created: true});
        }
    }

}

// delete
module.exports.delete = async (req, res) => {
    const { type, id } = req.params;
    let deleted;

    if (type === "user") {
        deleted = await User.findOneAndDelete(id);
        
        res.json({message: "deleted"});
    } else if (type === "product") {
        deleted = await Product.findOneAndDelete(id);
        
        res.json({message: "deleted"});
    } else if (type === "transaction") {
        deleted = await Transaction.findOneAndDelete(id);
        
        res.json({message: "deleted"});
    } else if (type === "admin") {
        deleted = await User.findOneAndDelete(id);
        
        res.json({message: "deleted"});
    }
}