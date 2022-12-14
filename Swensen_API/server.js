const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
global.__basedir = __dirname;
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.json({message: "Welcome to my REST API."});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
require("./app/routes/category.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/flavour.routes")(app);
require("./app/routes/menu.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/topping.routes")(app);
require("./app/routes/customer.routes")(app);
