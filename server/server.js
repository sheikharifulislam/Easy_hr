require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const { connectDb } = require("./db");
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Success",
    });
});

app.use((err, req, res, next) => {
    const message = err.message && err.status ? err.message : "Server Error Occured";
    const status = err.status ? err.status : 500;
    res.status(status).json({
        error: {
            message,
        },
    });
});

const port = process.env.PORT;
app.listen(port, async () => {
    await connectDb();
    console.log(`Server is listen on ${port}`);
});
