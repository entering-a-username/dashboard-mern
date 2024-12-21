const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const APIRoutes = require("./routes/APIRoutes");

require("dotenv").config();

const app = express();
 
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { app.listen(PORT, () => console.log('server is up')) })

// middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// routes
app.use("/api", APIRoutes);