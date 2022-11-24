module.exports = (app) => {
    const flavour_controller = require("../controllers/flavour.controller")
    var router = require("express").Router();
    router.post("/add", flavour_controller.createNewFlavour);
    router.get("/all", flavour_controller.getAllFlavour);
    router.put("/:id", flavour_controller.updateFlavour);
    router.delete("/:id", flavour_controller.deleteFlavour);

    app.use("/api/flavour", router);
};