const authJWT = require("../middleware/auth.jwt")
const flavour_controller = require("../controllers/flavour.controller");
module.exports = (app) => {
    const flavour_controller = require("../controllers/flavour.controller")
    var router = require("express").Router();
    //router.post("/add", flavour_controller.createNewCategory);
    app.use("/api/flavour", router);
};