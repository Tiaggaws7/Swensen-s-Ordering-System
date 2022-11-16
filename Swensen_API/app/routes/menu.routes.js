const authJWT = require("../middleware/auth.jwt")
const menu_controller = require("../controllers/menu.controller");
module.exports = (app) => {
    const menu_controller = require("../controllers/menu.controller")
    var router = require("express").Router();
    //router.post("/add", menu_controller.createNewCategory);
    app.use("/api/menu", router);
};