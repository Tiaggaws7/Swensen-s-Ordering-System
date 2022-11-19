const bcrypt = require("bcryptjs");
const Category = require("../models/category.model.js");

const getAllCategory = (req, res) => {
    Category.getAllRecords((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

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
        console.log(req.body)
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating.",
            });
        } else {
            res.send(data);
        }
    });
};

const updateCategory = (req, res) =>{
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty."});
    }
    const data = {
        name: req.body.name,
    };
    Category.updateByID(req.params.id, data, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found category id: " + req.params.id
                });
            } else{
                res.status(500).send({
                    message: "Error update category id: " + req.params.id
                });
            }
        } else res.send(result);
    });
};

const deleteCategory = (req, res) =>{
    Category.delete(req.params.id, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found category id: " + req.params.id
                });
            }else{
                res.status(500).send({
                    message: "Error delete category id: " + req.params.id
                });
            }
        }
        else res.send(result);
    });
};

module.exports = {
    getAllCategory,
    createNewCategory,
    updateCategory,
    deleteCategory
};
