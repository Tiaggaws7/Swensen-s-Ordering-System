module.exports = (app) => {
    const cart_controller = require("../controllers/cart.controller")
    var router = require("express").Router();
    router.post("/add", cart_controller.createNewCart);
    router.get("/all", cart_controller.getAllCart);
    router.put("/:id", cart_controller.updateCart);
    router.delete("/:id", cart_controller.deleteCart);
    router.delete("/customerCart/:id", cart_controller.deleteCustomerCart);

    app.use("/api/cart", router);
};