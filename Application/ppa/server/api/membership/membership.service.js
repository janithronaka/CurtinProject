var mongoose = require("./membership.model");
var MemberSchema = mongoose.model("Member");

function Controller() {
  this.insert = data => {
    return new Promise((resolve, reject) => {
      var MemberSchema = mongoose.model("Member");
      var membership = new MemberSchema(data);
      membership
        .save()
        .then(newAccount => {
          console.log("Data Inserted");
          resolve({
            status: 201,
            message: newAccount
          });
        })
        .catch(err => {
          console.log();
          reject({
            status: 500,
            message: "Error:- " + err
          });
        });
    });
  };

  this.getAll = () => {
    return new Promise((resolve, reject) => {
      MemberSchema.find()
        .then(data => {
          resolve({
            status: 200,
            message: data
          });
        })
        .catch(err => {
          console.log(err);
          reject({
            status: 500,
            message: "Error:- " + err
          });
        });
    });
  };

  this.get = id => {
    return new Promise((resolve, reject) => {
      MemberSchema.find()
        .exec()
        .then(data => {
          resolve({
            status: 200,
            message: data
          });
        })
        .catch(err => {
          reject({
            status: 404,
            message: "Error:- " + err
          });
        });
    });
  };

  this.getAllDir = (pageSize, currPage, filter, value) => {
    return new Promise((resolve, reject) => {
      var queryObj = {};
      console.log(filter);
      console.log(value);
      if (filter && value) {
        if (filter === "all") {
          queryObj = {
            $or: [
              { memberName: new RegExp(value, "i") },
              { addmissionNo: new RegExp(value, "i") },
              { nicNo: new RegExp(value, "i") }
            ]
          };
        } else if (filter === "memberName") {
          queryObj = {
            $or: [{ memberName: new RegExp(value, "i") }]
          };
        } else if (filter === "addmissionNo") {
          queryObj = {
            $or: [{ addmissionNo: new RegExp(value, "i") }]
          };
        } else if (filter === "nicNo") {
          queryObj = {
            $or: [{ nicNo: new RegExp(value, "i") }]
          };
        }
      }
      const query = MemberSchema.find(queryObj);
      let fetchedAccounts;

      if (pageSize && currPage) {
        query
          .sort("memberName")
          .skip(pageSize * (currPage - 1))
          .limit(pageSize);
      }

      query
        .then(documents => {
          fetchedAccounts = documents;
          return MemberSchema.countDocuments(queryObj);
        })
        .then(count => {
          resolve({
            status: 200,
            message: {
              message: "Members fetched successfully!",
              accounts: fetchedAccounts,
              accountCount: count
            }
          });
        })
        .catch(err => {
          reject({
            status: 404,
            message: "Error:- " + err
          });
        });
    });
  };

  this.getProfileCount = () => {
    return new Promise((resolve, reject) => {
      MemberSchema.count({ dataType: "Profile" })
        .exec()
        .then(data => {
          resolve({
            status: 200,
            message: data
          });
        })
        .catch(err => {
          reject({
            status: 500,
            message: "Error: " + err.message
          });
        });
    });
  };

  this.getNewRequestCount = () => {
    return new Promise((resolve, reject) => {
      MemberSchema.count({ dataType: "Request" })
        .exec()
        .then(data => {
          resolve({
            status: 200,
            message: data
          });
        })
        .catch(err => {
          reject({
            status: 500,
            message: "Error: " + err.message
          });
        });
    });
  };

  this.getbyMemberId = id => {
    return new Promise((resolve, reject) => {
      MemberSchema.findOne({
        memberId: id
      })
        .exec()
        .then(data => {
          resolve({
            status: 200,
            message: data
          });
        })
        .catch(err => {
          reject({
            status: 404,
            message: "Error:- " + err
          });
        });
    });
  };

  this.getbyObjId = id => {
    return new Promise((resolve, reject) => {
      MemberSchema.findOne({
        _id: id
      })
        .exec()
        .then(data => {
          resolve({
            status: 200,
            message: data
          });
        })
        .catch(err => {
          reject({
            status: 404,
            message: "Error:- " + err
          });
        });
    });
  };

  this.update = data => {
    return new Promise((resolve, reject) => {
      MemberSchema.update({ _id: data._id }, data)
        .then(updatedData => {
          console.log("Data Updated");
          resolve({
            status: 200,
            message: updatedData
          });
        })
        .catch(err => {
          reject({
            status: 500,
            message: "Error:- " + err
          });
        });
    });
  };

  this.delete = id => {
    return new Promise((resolve, reject) => {
      MemberSchema.deleteOne({ _id: id })
        .then(() => {
          resolve({
            status: 200
          });
        })
        .catch(err => {
          reject({
            status: 500,
            message: "Error:- " + err
          });
        });
    });
  };
}

module.exports = new Controller();
