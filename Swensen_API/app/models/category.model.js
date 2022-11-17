const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config"); // Maybe a problem with it

//Constructor
const Category = function (category) {
    this.name = category.name;
};

const expireTime = "1h";

Category.create = ( newCategory, result ) => {
    sql.query("INSERT INTO Category SET ?", newCategory, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        const token = jwt.sign({ id: res.insertId }, scKey.secret, {
            expiresIn: expireTime,
        });
        console.log("Created user: ", {
            id: res.insertId,
            ...newCategory,
            accessToken: token,
        });
        result(null, {
            id: res.insertId,
            ...newCategory,
            accessToken: token,
        });
    })
}

module.exports = Category