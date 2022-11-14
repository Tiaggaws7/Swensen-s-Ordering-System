const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");



//Constructor
const User = function (user) {
    this.name = user.name;
    this.mail = user.mail;
    this.password = user.password;
    this.address = user.address;
    this.postCode = user.postCode;
    this.city = user.city;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
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
            ...newUser,
            accessToken: token,
        });
        result(null, {
            id: res.insertId,
            ...newUser,
            accessToken: token,
        });
    });
};