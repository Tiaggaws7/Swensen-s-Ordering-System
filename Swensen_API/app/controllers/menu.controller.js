const Menu = require("../models/menu.model.js");

const getAllMenu = (req, res) => {
    Menu.getAllRecords((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing data.",
            });
        } else res.send(data);
    });
};

const createNewMenu = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty.",
        });
    }

    const menuObj = new Menu({
        flavourId: req.body.flavourId,
        categoryId: req.body.categoryId,
        name: req.body.name,
        image: req.body.image,
        hidden: req.body.hidden,
        price: req.body.price
    });

    Menu.create(menuObj, (err, data) => {
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

const updateMenu = (req, res) =>{
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty."});
    }
    const data = {
        flavourId: req.body.flavourId,
        categoryId: req.body.categoryId,
        name: req.body.name,
        image: req.body.image,
        hidden: req.body.hidden,
        price: req.body.price
    };
    Menu.updateByID(req.params.id, data, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Menu id: " + req.params.id
                });
            } else{
                res.status(500).send({
                    message: "Error update Menu id: " + req.params.id
                });
            }
        } else res.send(result);
    });
};

const deleteMenu = (req, res) =>{
    Menu.delete(req.params.id, (err, result)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({
                    message: "Not found Menu id: " + req.params.id
                });
            }else{
                res.status(500).send({
                    message: "Error delete Menu id: " + req.params.id
                });
            }
        }
        else res.send(result);
    });
};

module.exports = {
    getAllMenu,
    createNewMenu,
    updateMenu,
    deleteMenu
};
