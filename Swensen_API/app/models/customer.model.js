const sql = require("./db");

//Constructor
const Customer = function (customer) {
    this.name = customer.name;
    this.mail = customer.mail;
    this.password = customer.password;
    this.address = customer.address;
    this.postCode = customer.postCode;
    this.city = customer.city;
};

Customer.getAllRecords = (result) => {
    sql.query("SELECT * FROM Customer", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Customer.create = ( newCustomer, result ) => {
    sql.query("INSERT INTO Customer SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        console.log("Created Customer: ", {
            id: res.insertId,
            ...newCustomer
        });
        result(null, {
            id: res.insertId,
            ...newCustomer
        });
    })
}

Customer.updateByID = (id, data, result) => {
    sql.query(
        "UPDATE Customer SET name=?, mail=?, password=?, address=?, postCode=?, city=? WHERE id=?",
        [data.name, data.mail, data.password, data.address, data.postCode, data.city, id],
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
            console.log("Updated Customer: ", { id: id, ...data });
            result(null, { id: id, ...data });
        }
    );
};

Customer.delete = ( id, result ) => {
    sql.query("DELETE FROM Customer WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }    if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
            return;
        }
        console.log("Deleted Customer id: ", id)
        result(null, {id: id})
    });
}

module.exports = Customer
