const sql = require("./db");
let today = new Date();
      let dd = today.getDate();

      let mm = today.getMonth()+1;
      const yyyy = today.getFullYear();
      if(dd<10)
      {
        dd=`0${dd}`;
      }

      if(mm<10)
      {
        mm=`0${mm}`;
      }
      today = `${yyyy}-${mm}-${dd}`;

//Constructor
const Order = function (order) {
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

Order.getPending = (result) => {
    sql.query("SELECT * FROM Orders WHERE status = 'pending'", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Order.getPendingCount = (result) => {
    sql.query("SELECT COUNT(*) as number FROM Orders WHERE status = 'pending'", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Order.getRejectedCount = (result) => {
    sql.query("SELECT COUNT(*) FROM Orders WHERE status = 'rejected'", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Order.getAcceptedCount = (result) => {
    sql.query("SELECT COUNT(*) FROM Orders WHERE status = 'accepted'", (err, res) => {
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Order.getAcceptedTodayCount = (result) => {
    sql.query(`SELECT COUNT(*) FROM Orders WHERE status = 'accepted' AND date = '${today}'`, (err, res) => {
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
        "UPDATE Orders SET customerId=?, status=?, date=? WHERE id=?",
        [data.customerId, data.status, data.date, id],
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