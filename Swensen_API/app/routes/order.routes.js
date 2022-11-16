const authJWT = require("../middleware/auth.jwt")
const order_controller = require("../controllers/order.controller");
module.exports = (app) => {
    const order_controller = require("../controllers/order.controller")
    var router = require("express").Router();
    //router.post("/add", order_controller.createNewCategory);
    app.use("/api/order", router);
};