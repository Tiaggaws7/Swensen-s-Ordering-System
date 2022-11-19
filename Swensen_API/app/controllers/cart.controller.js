const Cart = require("../models/cart.model.js");

const getAllCart = (req, res) => {
    Cart.getAllRecords((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const createNewCart = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty.",
        });
    }

    const cartObj = new Cart({
        customerId: req.body.customerId,
        totalPrice: req.body.totalPrice,
        details: req.body.details
    });

    Cart.create(cartObj, (err, data) => {
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

const updateCart = (req, res) =>{
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty."});
    }
    const data = {
        customerId: req.body.customerId,
        totalPrice: req.body.totalPrice,
        details: req.body.details
    };
    Cart.updateByID(req.params.id, data, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Cart id: " + req.params.id
                });
            } else{
                res.status(500).send({
                    message: "Error update Cart id: " + req.params.id
                });
            }
        } else res.send(result);
    });
};

const deleteCart = (req, res) =>{
    Cart.delete(req.params.id, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Cart id: " + req.params.id
                });
            }else{
                res.status(500).send({
                    message: "Error delete Cart id: " + req.params.id
                });
            }
        }
        else res.send(result);
    });
};

module.exports = {
    getAllCart,
    createNewCart,
    updateCart,
    deleteCart
};
