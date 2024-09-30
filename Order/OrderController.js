const cust = require("../Customer/CustomerSchema");
const caterer = require("../Caterier/CaterierSchema");
const food =require('../Food/FoodSchema')
const order=require('./OrderSchema')
const mongoose = require('mongoose');


const addOrder = (req, res) => {
  const orders = new order({
    custid: req.body.custid,
    catid: req.body.catid,
    foodid: req.body.foodid,
    count: req.body.count,
    date: req.body.date,
    comments: req.body.comments,
  });
  orders.save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
const Vieworders = (req, res) => {

  order.find()
  .populate("custid")
  .populate("catid")
    .populate("foodid")
    .exec()
    .then((data) => {
        res.json({
          status: 200,
          data: data,
        });
      } 
    )
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

//View all pending orders for customer
const viewPendingOrdersByCustId= (req, res) => {
  order
    .find({ custid: req.params.id, status: "pending" })
    .populate("catid")
    .populate("foodid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};


//View all approved orders for cust

const viewConfirmedOrdersByCustId = (req, res) => {
  order
    .find({ custid: req.params.id, status: "approved" })
    .populate("catid")
    .populate("foodid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

//View all rejected orders for customer

const viewRejectedOrdersByCustId = (req, res) => {
  order
    .find({ custid: req.params.id, status: "rejected" })
    .populate("catid")
    .populate("foodid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

//View all shipped orders for customer

const viewshippedOrdersByCustId = (req, res) => {
  order
  .find({ custid: req.params.id, status: "shipped" })
  .populate("catid")
  .populate("foodid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data shipped successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const viewDeliveredOrdersByCustId = (req, res) => {
  order
  .find({ custid: req.params.id, status: "deliver" })
  .populate("catid")
  .populate("foodid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data shipped successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
//
const viewPendingOrdersByCat = async (req, res) => {
  
  order
  .find({ catid: req.params.id, status: "pending" })
  .populate("custid")
  .populate("foodid")
  .exec()
  .then((data) => {
    if (data.length > 0) {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    } else {
      res.json({
        status: 200,
        msg: "No Data obtained ",
      });
    }
  })
  .catch((err) => {
    res.json({
      status: 500,
      msg: "Data not Inserted",
      Error: err,
    });
  });
};



////reject order by caterier --> onclick event

const rejectOrderByCat = (req, res) => {
  order
    .findByIdAndUpdate(
      req.params.id, 
      { status: "rejected" },
      { new: true } 
    )
    .then((data) => {
      if (data) { 
        res.json({
          status: 200,
          msg: "Order rejected successfully",
          data: data,
        });
      } else { 
        res.status(404).json({
          status: 404,
          msg: "Order not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Error updating order",
        error: err,
      });
    });
};


//Approve order by caterer --> onclick event

const approveOrderByCat = (req, res) => {
  order
    .findByIdAndUpdate(
      req.params.id, // Use the id directly
      { status: "approved" },
      { new: true } // Return the updated document
    )
    .then((data) => {
      if (data) { // If the order is found and updated
        res.json({
          status: 200,
          msg: "Order approved successfully",
          data: data,
        });
      } else { // If no order is found with the given id
        res.status(404).json({
          status: 404,
          msg: "Order not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Error updating order",
        error: err,
      });
    });
};

const deliverOrderByCat = (req, res) => {
  order
    .findByIdAndUpdate(
      req.params.id, // Use the id directly
      { status: "deliver" },
      { new: true } // Return the updated document
    )
    .then((data) => {
      if (data) { // If the order is found and updated
        res.json({
          status: 200,
          msg: "Order approved successfully",
          data: data,
        });
      } else { // If no order is found with the given id
        res.status(404).json({
          status: 404,
          msg: "Order not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Error updating order",
        error: err,
      });
    });
};
//ship order  by caterier side --> onclick event

const ShipOrderByCat = (req, res) => {
  order
    .findByIdAndUpdate(
      req.params.id, // Use the id directly
      { status: "shipped" },
      { new: true } // Return the updated document
    )
    .then((data) => {
      if (data) { // If the order is found and updated
        res.json({
          status: 200,
          msg: "Order shipped successfully",
          data: data,
        });
      } else { // If no order is found with the given id
        res.status(404).json({
          status: 404,
          msg: "Order not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Error updating order",
        error: err,
      });
    });
};
 
// view Approved Order for caterer page 
const viewAprvdOrdersByCat = (req, res) => {
  order
    .find({ catid: req.params.id, status: "approved" })
    .populate("custid")
    .populate("foodid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// view shipped Order for caterer page 
const viewshippedOrdersByCat = (req, res) => {
  order
    .find({ catid: req.params.id, status: "shipped" })
    .populate("custid")
    .populate("foodid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const viewDeliverOrdersByCat = (req, res) => {
  order
    .find({ catid: req.params.id, status: "deliver" })
    .populate("custid")
    .populate("foodid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};







module.exports={addOrder,Vieworders, 

  viewPendingOrdersByCustId,
  viewConfirmedOrdersByCustId,
  viewRejectedOrdersByCustId,
  viewshippedOrdersByCustId ,
  viewDeliveredOrdersByCustId,//

  viewPendingOrdersByCat,
  rejectOrderByCat,
  approveOrderByCat,
  ShipOrderByCat,
  deliverOrderByCat,//
  viewAprvdOrdersByCat,
  viewshippedOrdersByCat,
  viewDeliverOrdersByCat //
}
