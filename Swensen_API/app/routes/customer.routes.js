module.exports = (app) => {
    const customer_controller = require("../controllers/customer.controller")
    var router = require("express").Router();
    router.post("/add", customer_controller.createNewCustomer);
    router.get("/all", customer_controller.getAllCustomer);
    router.put("/:id", customer_controller.updateCustomer);
    router.delete("/:id", customer_controller.deleteCustomer);

    app.use("/api/customer", router);
};