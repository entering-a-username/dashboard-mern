const express = require("express");

const router = express.Router();

const mainControllers = require("../controllers/mainControllers");
const salesControllers = require("../controllers/salesControllers");
const listControllers = require("../controllers/listControllers");

// users
router.get("/user/:id", mainControllers.getUser);
router.get("/users", mainControllers.getUsers);

// info
router.get("/products", mainControllers.getProducts);
router.get("/transactions", mainControllers.getTransactions);
router.get("/geography", mainControllers.getGeography);
router.get("/admins", mainControllers.getAdmins);

// list crud
router.get("/:type/:id/delete", listControllers.delete);
router.post("/:type/new", listControllers.create);

// sales
router.get("/sales", salesControllers.getSales);

module.exports = router;