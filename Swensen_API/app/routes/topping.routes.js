const authJWT = require("../middleware/auth.jwt")
const topping_controller = require("../controllers/topping.controller");
module.exports = (app) => {
    const topping_controller = require("../controllers/topping.controller")
    var router = require("express").Router();
    router.post("/add", topping_controller.createNewTopping);
    router.get("/all", topping_controller.getAllTopping);
    router.put("/:id", topping_controller.updateTopping);
    router.delete("/:id", topping_controller.deleteTopping);
    app.use("/api/toppings", router);
};