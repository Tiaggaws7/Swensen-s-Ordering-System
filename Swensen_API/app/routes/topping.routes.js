const authJWT = require("../middleware/auth.jwt")
const topping_controller = require("../controllers/topping.controller");
module.exports = (app) => {
    const topping_controller = require("../controllers/topping.controller")
    var router = require("express").Router();
    //router.post("/add", topping_controller.createNewCategory);
    app.use("/api/topping", router);
};