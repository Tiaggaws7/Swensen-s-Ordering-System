const sql = require("./db");

//Constructor
const Flavour = function (flavour) {
    this.name = flavour.name;
    this.price = flavour.price;
    this.image = flavour.image;
};

Flavour.getAllRecords = (result) => {
    sql.query("SELECT * FROM Flavour", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Flavour.create = ( newFlavour, result ) => {
    sql.query("INSERT INTO Flavour SET ?", newFlavour, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        console.log("Created Flavour: ", {
            id: res.insertId,
            ...newFlavour
        });
        result(null, {
            id: res.insertId,
            ...newFlavour
        });
    })
}

Flavour.updateByID = (id, data, result) => {
    sql.query(
        "UPDATE Flavour SET name=?, price=?, image=? WHERE id=?", [data.name, data.price, data.image, id],
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
            console.log("Updated Flavour: ", { id: id, ...data });
            result(null, { id: id, ...data });
        }
    );
};

Flavour.delete = ( id, result ) => {
    sql.query("DELETE FROM Flavour WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }    if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
            return;
        }
        console.log("Deleted Flavour id: ", id)
        result(null, {id: id})
    });
}

module.exports = Flavour