const bcrypt = require("bcryptjs");
const Category = require("../models/category.model.js");
const createNewCategory = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty.",
        });
    }

    const categoryObj = new Category({
        name: req.body.name
    });
    Category.create(categoryObj, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating.",
            });
        } else res.send(data);
    });
};

module.exports = {
    createNewCategory
};
