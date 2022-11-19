const Customer = require("../models/customer.model.js");

const getAllCustomer = (req, res) => {
    Customer.getAllRecords((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const createNewCustomer = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty.",
        });
    }

    const customerObj = new Customer({
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
        address: req.body.address,
        postCode: req.body.postCode,
        city: req.body.city
    });

    Customer.create(customerObj, (err, data) => {
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

const updateCustomer = (req, res) =>{
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty."});
    }
    const data = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
        address: req.body.address,
        postCode: req.body.postCode,
        city: req.body.city
    };
    Customer.updateByID(req.params.id, data, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Customer id: " + req.params.id
                });
            } else{
                res.status(500).send({
                    message: "Error update Customer id: " + req.params.id
                });
            }
        } else res.send(result);
    });
};

const deleteCustomer = (req, res) =>{
    Customer.delete(req.params.id, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Customer id: " + req.params.id
                });
            }else{
                res.status(500).send({
                    message: "Error delete Customer id: " + req.params.id
                });
            }
        }
        else res.send(result);
    });
};

module.exports = {
    getAllCustomer,
    createNewCustomer,
    updateCustomer,
    deleteCustomer
};
