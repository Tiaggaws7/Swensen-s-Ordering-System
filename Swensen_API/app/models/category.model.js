const sql = require("./db");

//Constructor
const Category = function (category) {
    this.name = category.name;
};

Category.getAllRecords = (result) => {
    sql.query("SELECT * FROM Category", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Category.create = ( newCategory, result ) => {
    sql.query("INSERT INTO Category SET ?", newCategory, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        console.log("Created category: ", {
            id: res.insertId,
            ...newCategory
        });
        result(null, {
            id: res.insertId,
            ...newCategory
        });
    })
}

Category.updateByID = (id, data, result) => {
    sql.query(
        "UPDATE Category SET name=? WHERE id=?", [data.name, id],
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
            console.log("Updated Category: ", { id: id, ...data });
            result(null, { id: id, ...data });
        }
    );
};

Category.delete = ( id, result ) => {
    sql.query("DELETE FROM Category WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }    if(res.affectedRows == 0){
            result({kind: "not_found"}, null)
            return;
        }
        console.log("Deleted category id: ", id)
        result(null, {id: id})
    });
}

module.exports = Category