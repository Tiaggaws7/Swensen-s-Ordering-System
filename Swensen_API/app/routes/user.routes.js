// user.routes.js
const authJwt = require("../middleware/authJwt");
module.exports = (app) => {
    const user_controller = require("../controllers/user.controller");
    var router = require("express").Router();

    /* Route example
    router.post("/signup", user_controller.createNew);
    router.get("/:us", user_controller.validUsername);
    router.post("/login", user_controller.login);
    router.get("/", authJwt, user_controller.getAllUsers);
    router.put("/:id", authJwt, user_controller.updateUser);
    router.delete("/:id", authJwt, user_controller.deleteUser);
     */

    app.use("/api/auth", router);
};