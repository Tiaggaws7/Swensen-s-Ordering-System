const Flavour = require("../models/flavour.model.js");

const getAllFlavour = (req, res) => {
    Flavour.getAllRecords((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const createNewFlavour = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty.",
        });
    }

    const flavourObj = new Flavour({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    });

    Flavour.create(flavourObj, (err, data) => {
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

const updateFlavour = (req, res) =>{
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty."});
    }
    const data = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    };
    Flavour.updateByID(req.params.id, data, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Flavour id: " + req.params.id
                });
            } else{
                res.status(500).send({
                    message: "Error update Flavour id: " + req.params.id
                });
            }
        } else res.send(result);
    });
};

const deleteFlavour = (req, res) =>{
    Flavour.delete(req.params.id, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Flavour id: " + req.params.id
                });
            }else{
                res.status(500).send({
                    message: "Error delete Flavour id: " + req.params.id
                });
            }
        }
        else res.send(result);
    });
};

module.exports = {
    getAllFlavour,
    createNewFlavour,
    updateFlavour,
    deleteFlavour
};
