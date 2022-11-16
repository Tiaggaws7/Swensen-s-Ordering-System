const authJWT = require("../middleware/auth.jwt")
const cart_controller = require("../controllers/cart.controller");
module.exports = (app) => {
    const cart_controller = require("../controllers/cart.controller")
    var router = require("express").Router();
    //router.post("/add", cart_controller.createNewCategory);
    app.use("/api/cart", router);
};