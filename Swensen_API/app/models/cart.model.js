<<<<<<< HEAD


//Constructor
const Cart = function (cart) {
    this.customerID = cart.customerID;
    this.totalPrice = cart.totalPrice;
    this.details = cart.details;
};
=======
const sql = require("./db");

//Constructor
const Cart = function (cart) {
    this.customerId = cart.customerId;
    this.totalPrice = cart.totalPrice;
    this.details = cart.details;
};

Cart.getAllRecords = (result) => {
    sql.query("SELECT * FROM Cart", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Cart.create = ( newCart, result ) => {
    sql.query("INSERT INTO Cart SET ?", newCart, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        console.log("Created Cart: ", {
            id: res.insertId,
            ...newCart
        });
        result(null, {
            id: res.insertId,
            ...newCart
        });
    })
}

Cart.updateByID = (id, data, result) => {
    sql.query(
        "UPDATE Cart SET customerId=?, totalPrice=?, details=? WHERE id=?",
        [data.customerId, data.totalPrice, data.details, id],
        (err, res) => {
            if (err) {
                console.log("Query error: " + err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                //this id not found
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("Updated Cart: ", { id: id, ...data });
            result(null, { id: id, ...data });
        }
    );
};

Cart.delete = ( id, result ) => {
    sql.query("DELETE FROM Cart WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }    if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
            return;
        }
        console.log("Deleted Cart id: ", id)
        result(null, {id: id})
    });

}

Cart.deleteCustomerCart = ( id, result ) => {
    sql.query("DELETE FROM Cart WHERE customerId = ?", id, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }    if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
            return;
        }
        console.log("Deleted Cart id: ", id)
        result(null, {id: id})
    });

}

module.exports = Cart
>>>>>>> master
