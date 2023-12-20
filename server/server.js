require("dotenv").config();
const express = require("express");
const app = express();

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Success",
    });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listen on ${port}`);
});
