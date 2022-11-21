const sql = require("./db");

//Constructor
const Menu = function (menu) {
    this.flavourId = menu.flavourId
    this.categoryId = menu.categoryId
    this.name = menu.name;
    this.image = menu.image
    this.hidden = menu.hidden;
    this.price = menu.price
};

Menu.getAllRecords = (result) => {
    sql.query("SELECT * FROM Menu", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Menu.create = ( newMenu, result ) => {
    sql.query("INSERT INTO Menu SET ?", newMenu, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        console.log("Created Menu: ", {
            id: res.insertId,
            ...newMenu
        });
        result(null, {
            id: res.insertId,
            ...newMenu
        });
    })
}

Menu.updateByID = (id, data, result) => {
    sql.query(
        "UPDATE Menu SET flavourId=?, categoryId=?, name=?, image=?, hidden=?, price=? WHERE id=?",
        [data.flavourId, data.categoryId, data.name, data.image, data.hidden, data.price, id],
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
            console.log("Updated Menu: ", { id: id, ...data });
            result(null, { id: id, ...data });
        }
    );
};

Menu.delete = ( id, result ) => {
    sql.query("DELETE FROM Menu WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }    if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
            return;
        }
        console.log("Deleted Menu id: ", id)
        result(null, {id: id})
    });
}

module.exports = Menu