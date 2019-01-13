var mongoose = require("./admission.model");
var AdmissionSchema = mongoose.model("Admission");

function Controller() {
  // insert method
  this.insert = data => {
    return new Promise((resolve, reject) => {
      var AdmissionSchema = mongoose.model("Admission");
      var admission = new AdmissionSchema(data);
      admission
        .save()
        .then(newData => {
          console.log("Data Inserted");
          resolve({
            status: 201,
            message: newData
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

  // this method returns all the objects in the schema
  this.getAll = () => {
    return new Promise((resolve, reject) => {
      AdmissionSchema.find()
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

  // This returns the respective object for the passed id
  this.get = id => {
    return new Promise((resolve, reject) => {
      AdmissionSchema.findOne({
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

  // update method for the admission objects
  this.update = data => {
    return new Promise((resolve, reject) => {
      AdmissionSchema.update({ _id: data._id }, data)
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

  // delete method
  this.delete = id => {
    return new Promise((resolve, reject) => {
      AdmissionSchema.deleteOne({ _id: id })
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
