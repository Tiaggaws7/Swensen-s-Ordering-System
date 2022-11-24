module.exports = (app) => {
    const order_controller = require("../controllers/order.controller")
    var router = require("express").Router();
    router.post("/add", order_controller.createNewOrder);
    router.get("/all", order_controller.getAllOrder);
    router.get("/all/pending", order_controller.getPending);
    router.get("/all/pending/count", order_controller.getPendingCount);
    router.get("/all/rejected/count", order_controller.getRejectedCount);
    router.get("/all/accepted/count", order_controller.getAcceptedCount);
    router.get("/all/accepted/today/count", order_controller.getAcceptedTodayCount);
    router.put("/:id", order_controller.updateOrder);
    router.delete("/:id", order_controller.deleteOrder);

    app.use("/api/order", router);
};