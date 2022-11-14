

//Constructor
const Order = function (order) {
    this.cartID = order.cartID;
    this.customerID = order.customerID;
    this.status = order.status;
    this.date = order.date;
};