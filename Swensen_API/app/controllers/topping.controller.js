const Topping = require("../models/topping.model.js");

const getAllTopping = (req, res) => {
    Topping.getAllRecords((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const createNewTopping = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty.",
        });
    }

    const toppingObj = new Topping({
        name: req.body.name,
        price: req.body.price
    });

    Topping.create(toppingObj, (err, data) => {
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

const updateTopping = (req, res) =>{
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty."});
    }
    const data = {
        name: req.body.name,
        price: req.body.price
    };
    Topping.updateByID(req.params.id, data, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Topping id: " + req.params.id
                });
            } else{
                res.status(500).send({
                    message: "Error update Topping id: " + req.params.id
                });
            }
        } else res.send(result);
    });
};

const deleteTopping = (req, res) =>{
    Topping.delete(req.params.id, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Topping id: " + req.params.id
                });
            }else{
                res.status(500).send({
                    message: "Error delete Topping id: " + req.params.id
                });
            }
        }
        else res.send(result);
    });
};

module.exports = {
    getAllTopping,
    createNewTopping,
    updateTopping,
    deleteTopping
};
