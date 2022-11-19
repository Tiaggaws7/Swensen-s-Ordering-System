const sql = require("./db");

//Constructor
const Order = function (order) {
    this.cartId = order.cartId;
    this.customerId = order.customerId;
    this.status = order.status;
    this.date = order.date;
};

Order.getAllRecords = (result) => {
    sql.query("SELECT * FROM Orders", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Order.create = ( newOrder, result ) => {
    sql.query("INSERT INTO Orders SET ?", newOrder, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        console.log("Created Order: ", {
            id: res.insertId,
            ...newOrder
        });
        result(null, {
            id: res.insertId,
            ...newOrder
        });
    })
}

Order.updateByID = (id, data, result) => {
    sql.query(
        "UPDATE Orders SET cartId=?, customerId=?, status=?, date=? WHERE id=?",
        [data.cartId, data.customerId, data.status, data.date, id],
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
            console.log("Updated Order: ", { id: id, ...data });
            result(null, { id: id, ...data });
        }
    );
};

Order.delete = ( id, result ) => {
    sql.query("DELETE FROM Orders WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }    if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
            return;
        }
        console.log("Deleted Order id: ", id)
        result(null, {id: id})
    });
}

module.exports = Order