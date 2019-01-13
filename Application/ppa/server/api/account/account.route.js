var express = require("express");
var router = express.Router();
const AccountSchema = require("./account.model");
const TransactionSchema = require("../transaction/transaction.model");

router.post("/", (req, res, next) => {
  console.log(req.body);
  const account = new AccountSchema({
    accId: req.body.accId,
    desc: req.body.desc,
    status: req.body.status
  });
  account.save().then(createdAccount => {
    res.status(201).json({
      message: "Account added successfully",
      accountObj: {
        ...createdAccount,
        id: createdAccount._id
      }
    });
  });
});

router.get("/", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currPage = +req.query.currpage;
  var filter = req.query.filter;
  var value = req.query.value;
  var queryObj = {};
  console.log(filter);
  console.log(value);
  if (filter && value) {
    if (filter==='all'){
      queryObj = {
        $or:[{accId: new RegExp(value, "i")},{desc: new RegExp(value, "i")},{status: new RegExp(value, "i")}]
      }
    } else if (filter==='account'){
      queryObj = {
        $or:[{accId: new RegExp(value, "i")}]
      }
    } else if (filter==='desc'){
      queryObj = {
        $or:[{desc: new RegExp(value, "i")}]
      }
    } else if (filter==='status'){
      queryObj = {
        $or:[{status: new RegExp(value, "i")}]
      }
    }
  }
  const query = AccountSchema.find(queryObj);
  let fetchedAccounts;

  if (pageSize && currPage) {
    query
      .sort("accId")
      .skip(pageSize * (currPage - 1))
      .limit(pageSize);
  }
  query
    .then(documents => {
      fetchedAccounts = documents;
      return AccountSchema.countDocuments(queryObj);
    })
    .then(count => {
      res.status(200).json({
        message: "Accounts fetched successfully!",
        accounts: fetchedAccounts,
        accountCount: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  AccountSchema.findOne({
    accId: req.params.id
  })
    .exec()
    .then(documents => {
      if (documents) {
        res.status(200).json({
          documents
        });
      } else {
        res.status(404).json({
          message: "Account not found!"
        });
      }
    });
});

router.get("/active/all", (req, res, next) => {
  AccountSchema.find({
    status: "Open"
  })
    .select({ accId: 1, _id: 0 })
    .exec()
    .then(documents => {
      if (documents) {
        var names = documents.map(function(document) {
          return document["accId"];
        });
        res.status(200).json({
          documents: { names: names }
        });
      } else {
        res.status(404).json({
          message: "Accounts not found!"
        });
      }
    });
});

router.get("/count/all", (req, res, next) => {
  AccountSchema.countDocuments()
    .exec()
    .then(dci => {
      res.status(200).json({
        message: "Accounts count successfull!",
        accountCount: dci
      });
    });
});

router.put("/:id", (req, res, next) => {
  let fetchedAccountId;
  const account = new AccountSchema({
    accId: req.body.accId,
    desc: req.body.desc,
    status: req.body.status
  });

  AccountSchema.findOne({
    accId: req.params.id
  })
    .exec()
    .then(documents => {
      fetchedAccountId = documents._id;
      const account = new AccountSchema({
        _id: fetchedAccountId,
        accId: req.body.accId,
        desc: req.body.desc,
        status: req.body.status
      });
      AccountSchema.updateOne({ _id: fetchedAccountId }, account).then(
        result => {
          res.status(200).json({
            message: "Account Updated!"
          });
        }
      );
    });
});

router.delete("/:id", (req, res, next) => {
  TransactionSchema.findOne({
    accId: req.params.id
  })
    .exec()
    .then(documents => {
      if (documents) {
        console.log("file deletion failed: ");
        res
          .status(200)
          .json({ message: "Account cannot be deleted. Transactions exist!" });
      } else {
        console.log("no transactions for Account");
        AccountSchema.deleteOne({ accId: req.params.id }).then(result => {
          console.log("Account deleted!");
          res.status(200).json({ message: "Account deleted!" });
        });
      }
    })
    .catch(error => {
      console.log("failed delete: " + error.message);
    });
});

module.exports = router;
