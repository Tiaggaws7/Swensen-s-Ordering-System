module.exports = (app) => {
    const menu_controller = require("../controllers/menu.controller")
    var router = require("express").Router();
    router.post("/add", menu_controller.createNewMenu);
    router.get("/all", menu_controller.getAllMenu);
    router.put("/:id", menu_controller.updateMenu);
    router.delete("/:id", menu_controller.deleteMenu);

    app.use("/api/menu", router);
};