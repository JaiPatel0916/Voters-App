const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const voterRoutes = require("./routes/voterRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/voters", voterRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("API Running"));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => console.log("Server running on 5000"));
    })
    .catch((err) => console.log(err));
