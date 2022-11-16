const authJWT = require("../middleware/auth.jwt")
module.exports = (app) => {
    const category_controller = require("../controllers/category.controller")
    var router = require("express").Router();
    router.post("/add", category_controller.createNewCategory);
    app.use("/api/category", router);
};