const Order = require("../models/order.model.js");

const getAllOrder = (req, res) => {
    Order.getAllRecords((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const getPending = (req, res) => {
    Order.getPending((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const getPendingCount = (req, res) => {
    Order.getPendingCount((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const getRejectedCount = (req, res) => {
    Order.getRejectedCount((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const getAcceptedCount = (req, res) => {
    Order.getAcceptedCount((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const getAcceptedTodayCount = (req, res) => {
    Order.getAcceptedTodayCount((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const createNewOrder = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty.",
        });
    }

    const orderObj = new Order({
        customerId: req.body.customerId,
        status: req.body.customerId,
        date: req.body.date
    });

    Order.create(orderObj, (err, data) => {
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

const updateOrder = (req, res) =>{
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty."});
    }
    const data = {
        customerId: req.body.customerId,
        status: req.body.status,
        date: req.body.date
    };
    Order.updateByID(req.params.id, data, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Order id: " + req.params.id
                });
            } else{
                res.status(500).send({
                    message: "Error update Order id: " + req.params.id
                });
            }
        } else res.send(result);
    });
};

const deleteOrder = (req, res) =>{
    Order.delete(req.params.id, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Order id: " + req.params.id
                });
            }else{
                res.status(500).send({
                    message: "Error delete Order id: " + req.params.id
                });
            }
        }
        else res.send(result);
    });
};

module.exports = {
    getAllOrder,
    getPending,
    getPendingCount,
    getAcceptedCount,
    getRejectedCount,
    getAcceptedTodayCount,
    createNewOrder,
    updateOrder,
    deleteOrder
};
