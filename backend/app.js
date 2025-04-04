const express = require("express");
const cors = require("cors");
const path = require("path");
const ApiError = require("./app/api-error");
const app = express();
const mainRouter = require("./app/routes/routes")

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'app', 'uploads')));

app.use('/api', mainRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;