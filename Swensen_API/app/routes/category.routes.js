const category_controller = require("../controllers/category.controller");
module.exports = (app) => {
    const category_controller = require("../controllers/category.controller")
    var router = require("express").Router();
    router.post("/add", category_controller.createNewCategory);
    router.get("/all", category_controller.getAllCategory);
    router.put("/:id", category_controller.updateCategory);
    router.delete("/:id", category_controller.deleteCategory);

    app.use("/api/category", router);
};