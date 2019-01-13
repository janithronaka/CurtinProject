var express = require("express");
var router = express.Router();
const TransactionSchema = require("./transaction.model");
const AccountSchema = require("../account/account.model");
const _ = require('underscore-node');

router.post("/", (req, res, next) => {
  console.log(req.body);
  const transaction = new TransactionSchema({
    accId: req.body.accId,
    amount: req.body.amount,
    desc: req.body.desc,
    entered: req.body.entered,
    donation: req.body.donation
  });

  AccountSchema.findOne({
    accId: req.body.accId
  })
    .exec()
    .then(documents => {
      if (documents) {
        if (documents.status === "Open") {
          transaction.save().then(createdTransaction => {
            res.status(201).json({
              message: "Transaction added successfully",
              transcationObj: {
                ...createdTransaction,
                id: createdTransaction._id
              }
            });
          });
        } else {
          res.status(404).json({
            message:
              "You cannot enter transactions for a Account in colsed state."
          });
        }
      } else {
        res.status(404).json({
          message: "Account not found! Please enter valid Account."
        });
      }
    });
});

router.get("/:id", (req, res, next) => {
  TransactionSchema.findOne({
    _id: req.params.id
  })
    .exec()
    .then(documents => {
      if (documents) {
        res.status(200).json({
          documents
        });
      } else {
        res.status(404).json({
          message: "Transaction not found!"
        });
      }
    });
});

router.get("/income/year", (req, res, next) => {
  var date = new Date();
  var from = new Date(date.getFullYear(), 0, 1);
  var until = new Date(date.getFullYear(), 12, 0);

  let arr = [];
  var queryObj = {};
  console.log(from);console.log(until);
  arr = [
    { date: { $gte: from }},
    { date: { $lte: until }},
    { amount: {$gte: 0}}
  ];
  queryObj['$and'] = arr;

  var query = TransactionSchema.find(queryObj);

  query
    .then(documents => {
      let sum = _.reduce(documents, function(memo, reading){ return memo + reading.amount; }, 0);
      res.status(200).json({
        message: "Transactions amount success!",
        amount: sum
      });
    });
});

router.get("/income/month", (req, res, next) => {
  var date = new Date();
  var from = new Date(date.getFullYear(), date.getMonth(), 1);
  var until = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  let arr = [];
  var queryObj = {};
  console.log(from);console.log(until);
  arr = [
    { date: { $gte: from }},
    { date: { $lte: until }},
    { amount: {$gte: 0}}
  ];
  queryObj['$and'] = arr;

  var query = TransactionSchema.find(queryObj);

  query
    .then(documents => {
      let sum = _.reduce(documents, function(memo, reading){ return memo + reading.amount; }, 0);
      res.status(200).json({
        message: "Transactions amount success!",
        amount: sum
      });
    });
});

router.get("/expense/year", (req, res, next) => {
  var date = new Date();
  var from = new Date(date.getFullYear(), 0, 1);
  var until = new Date(date.getFullYear(), 12, 0);

  let arr = [];
  var queryObj = {};
  console.log(from);console.log(until);
  arr = [
    { date: { $gte: from }},
    { date: { $lte: until }},
    { amount: {$lt: 0}}
  ];
  queryObj['$and'] = arr;

  var query = TransactionSchema.find(queryObj);

  query
    .then(documents => {
      let sum = _.reduce(documents, function(memo, reading){ return memo + reading.amount; }, 0);
      sum = Math.abs(sum);
      res.status(200).json({
        message: "Transactions amount success!",
        amount: sum
      });
    });
});

router.get("/expense/month", (req, res, next) => {
  var date = new Date();
  var from = new Date(date.getFullYear(), date.getMonth(), 1);
  var until = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  let arr = [];
  var queryObj = {};
  console.log(from);console.log(until);
  arr = [
    { date: { $gte: from }},
    { date: { $lte: until }},
    { amount: {$lt: 0}}
  ];
  queryObj['$and'] = arr;

  var query = TransactionSchema.find(queryObj);

  query
    .then(documents => {
      let sum = _.reduce(documents, function(memo, reading){ return memo + reading.amount; }, 0);
      sum = Math.abs(sum);
      res.status(200).json({
        message: "Transactions amount success!",
        amount: sum
      });
    });
});

router.get("/balance/account", (req, res, next) => {
  var date = new Date();
  var from = new Date(date.getFullYear(), 0, 1);
  var until = new Date(date.getFullYear(), 12, 0);
  var accId = req.query.accId;
  let arr = [];
  var queryObj = {};
  console.log(from);console.log(until);
  arr = [
    { date: { $gte: from }},
    { date: { $lte: until }},
    { accId: accId }
  ];
  queryObj['$and'] = arr;

  var query = TransactionSchema.find(queryObj);

  query
    .then(documents => {
      let sum = _.reduce(documents, function(memo, reading){ return memo + reading.amount; }, 0);
      sum = Math.abs(sum);
      res.status(200).json({
        message: "Transactions amount success!",
        amount: sum
      });
    });
});

router.delete("/:id", (req, res, next) => {
  TransactionSchema.findOne({
    _id: req.params.id
  })
    .exec()
    .then(documents => {
      if (documents && documents.entered == "SYSTEM") {
        console.log("file deletion failed: ");
        res.status(200).json({
          message: "Cannot delete Transactions entered by the system."
        });
      } else {
        console.log("no transactions for Account");
        TransactionSchema.deleteOne({ _id: req.params.id }).then(result => {
          console.log("Transaction deleted!");
          res.status(200).json({ message: "Transaction deleted!" });
        });
      }
    })
    .catch(error => {
      console.log("failed delete: " + error.message);
    });
});

router.put("/:id", (req, res, next) => {
  const transaction = new TransactionSchema({
    _id: req.params.id,
    accId: req.body.accId,
    amount: req.body.amount,
    desc: req.body.desc,
    donation: req.body.donation,
    entered: req.body.entered,
    date: Date.now()
  });
  TransactionSchema.updateOne({ _id: req.params.id }, transaction).then(
    result => {
      res.status(200).json({
        message: "Transaction Updated!"
      });
    }
  );
});

router.get("/", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currPage = +req.query.currpage;
  var filter = req.query.filter;
  var value = req.query.value;
  var from = req.query.from;
  var until = req.query.until;
  let fetchedTransactions;
  let arr = [];
  var queryObj = {};
  function isValidDate(d) {
    if (Object.prototype.toString.call(d) === "[object Date]") {
      if (isNaN(d.getTime())) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  console.log(filter);
  console.log(value);
  if (filter && value) {
    if (filter === "all" && isNaN(value)) {
      queryObj = {
        $or: [
          { accId: new RegExp(value, "i") },
          { desc: new RegExp(value, "i") },
          { entered: new RegExp(value, "i") },
          { donation: new RegExp(value, "i") }
        ]
      };
    } else if (filter === "all" && !isNaN(value)) {
      queryObj = {
        $or: [
          { accId: new RegExp(value, "i") },
          { amount: value },
          { desc: new RegExp(value, "i") },
          { entered: new RegExp(value, "i") },
          { donation: new RegExp(value, "i") }
        ]
      };
    } else if (filter === "account") {
      queryObj = {
        $or: [{ accId: new RegExp(value, "i") }]
      };
    } else if (filter === "amount" && !isNaN(value)) {
      queryObj = {
        $or: [{ amount: value }]
      };
    } else if (filter === "desc") {
      queryObj = {
        $or: [{ desc: new RegExp(value, "i") }]
      };
    } else if (filter === "entered") {
      queryObj = {
        $or: [{ entered: new RegExp(value, "i") }]
      };
    } else if (filter === "donation") {
      queryObj = {
        $or: [{ donation: new RegExp(value, "i") }]
      };
    }
  }
  from = new Date (req.query.from);
  until = new Date (req.query.until);
  if (isValidDate(from) && isValidDate(until)) {
    arr = [{ date: { $gte: from }},{ date: { $lte: until }}];
    queryObj['$and'] = arr;
  }
  var query = TransactionSchema.find(queryObj);
  if (req.query.accid) {
    query = TransactionSchema.find({
      accId: req.query.accid
    });
  }
  if (pageSize && currPage) {
    query
      .sort("-date")
      .skip(pageSize * (currPage - 1))
      .limit(pageSize);
  }
  query
    .then(documents => {
      fetchedTransactions = documents;
      if (req.query.accid) {
        return TransactionSchema.countDocuments({
          accId: req.query.accid
        });
      } else {
        return TransactionSchema.countDocuments(queryObj);
      }
    })
    .then(count => {
      res.status(200).json({
        message: "Transactions fetched successfully!",
        transactions: fetchedTransactions,
        transactionCount: count
      });
    });
});

router.delete("/:id", (req, res, next) => {
  TransactionSchema.findOne({
    _id: req.params.id
  })
    .exec()
    .then(documents => {
      if (documents && documents.entered == "SYSTEM") {
        console.log("file deletion failed: ");
        res.status(200).json({
          message: "Cannot delete Transactions entered by the system."
        });
      } else {
        console.log("no transactions for Account");
        TransactionSchema.deleteOne({ _id: req.params.id }).then(result => {
          console.log("Transaction deleted!");
          res.status(200).json({ message: "Transaction deleted!" });
        });
      }
    })
    .catch(error => {
      console.log("failed delete: " + error.message);
    });
});

router.get("/report/bal", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currPage = +req.query.currpage;
  var filter = req.query.filter;
  var value = req.query.value;
  var from = req.query.from;
  var until = req.query.until;
  let fetchedTransactions;
  let arr = [];
  var queryObj = {};
  function isValidDate(d) {
    if (Object.prototype.toString.call(d) === "[object Date]") {
      if (isNaN(d.getTime())) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  console.log(filter);
  console.log(value);
  if (filter && value) {
    if (filter === "all" && isNaN(value)) {
      queryObj = {
        $or: [
          { accId: new RegExp(value, "i") },
          { desc: new RegExp(value, "i") },
          { entered: new RegExp(value, "i") },
          { donation: new RegExp(value, "i") }
        ]
      };
    } else if (filter === "all" && !isNaN(value)) {
      queryObj = {
        $or: [
          { accId: new RegExp(value, "i") },
          { amount: value },
          { desc: new RegExp(value, "i") },
          { entered: new RegExp(value, "i") },
          { donation: new RegExp(value, "i") }
        ]
      };
    } else if (filter === "account") {
      queryObj = {
        $or: [{ accId: new RegExp(value, "i") }]
      };
    } else if (filter === "amount" && !isNaN(value)) {
      queryObj = {
        $or: [{ amount: value }]
      };
    } else if (filter === "desc") {
      queryObj = {
        $or: [{ desc: new RegExp(value, "i") }]
      };
    } else if (filter === "entered") {
      queryObj = {
        $or: [{ entered: new RegExp(value, "i") }]
      };
    } else if (filter === "donation") {
      queryObj = {
        $or: [{ donation: new RegExp(value, "i") }]
      };
    }
  }
  from = new Date (req.query.from);
  until = new Date (req.query.until);
  if (isValidDate(from) && isValidDate(until)) {
    arr = [{ date: { $gte: from }},{ date: { $lte: until }}];
    queryObj['$and'] = arr;
  }
  var query = TransactionSchema.find(queryObj);
  if (req.query.accid) {
    query = TransactionSchema.find({
      accId: req.query.accid
    });
  }
  if (pageSize && currPage) {
    query
      .sort("-date")
      .skip(pageSize * (currPage - 1))
      .limit(pageSize);
  }
  query
    .then(documents => {
      fetchedTransactions = documents;
      if (req.query.accid) {
        return TransactionSchema.countDocuments({
          accId: req.query.accid
        });
      } else {
        return TransactionSchema.countDocuments(queryObj);
      }
    })
    .then(count => {
      res.status(200).json({
        message: "Transactions fetched successfully!",
        transactions: fetchedTransactions,
        transactionCount: count
      });
    });
});

module.exports = router;
