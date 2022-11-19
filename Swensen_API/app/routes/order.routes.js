module.exports = (app) => {
    const order_controller = require("../controllers/order.controller")
    var router = require("express").Router();
    router.post("/add", order_controller.createNewOrder);
    router.get("/all", order_controller.getAllOrder);
    router.put("/:id", order_controller.updateOrder);
    router.delete("/:id", order_controller.deleteOrder);

    app.use("/api/order", router);
};