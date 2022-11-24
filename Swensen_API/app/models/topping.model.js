<<<<<<< HEAD


=======
const sql = require("./db");
>>>>>>> master

//Constructor
const Topping = function (topping) {
    this.name = topping.name;
    this.price = topping.price;
<<<<<<< HEAD
};
=======
};

Topping.getAllRecords = (result) => {
    sql.query("SELECT * FROM Toppings", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Topping.create = ( newTopping, result ) => {
    sql.query("INSERT INTO Toppings SET ?", newTopping, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        console.log("Created Topping: ", {
            id: res.insertId,
            ...newTopping
        });
        result(null, {
            id: res.insertId,
            ...newTopping
        });
    })
}

Topping.updateByID = (id, data, result) => {
    sql.query(
        "UPDATE Toppings SET name=?, price=? WHERE id=?", [data.name, data.price, id],
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
            console.log("Updated Topping: ", { id: id, ...data });
            result(null, { id: id, ...data });
        }
    );
};

Topping.delete = ( id, result ) => {
    sql.query("DELETE FROM Toppings WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }    if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
            return;
        }
        console.log("Deleted Topping id: ", id)
        result(null, {id: id})
    });
}

module.exports = Topping
>>>>>>> master
