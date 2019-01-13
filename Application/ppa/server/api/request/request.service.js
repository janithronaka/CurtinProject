var mongoose = require('./request.model');
var ReqSchema = mongoose.model('Request');

function Controller() {

  this.insert = (data) => {
    return new Promise((resolve, reject) => {
        var Req = new ReqSchema(data);
        Req.save().then((newReq) => {
            console.log('Request Added')
            resolve({
                status: 201,
                message: newReq
            })
        }).catch((err) => {
            console.log()
            reject({
                status: 500,
                message: "Error:- " + err
            })
        })
    })
};

this.getAll = () => {
    return new Promise((resolve, reject) => {
      ReqSchema.find().then(data => {
            resolve({
                status: 200,
                message: data
            });
        }).catch((err) => {
            console.log(err);
            reject({
                status: 500,
                message: "Error:- " + err
            })
        })

    })
};

this.get = (id) => {
    return new Promise((resolve, reject) => {
      ReqSchema.findOne({
            _id: id
        }).exec().then((data) => {
            resolve({
                status: 200,
                message: data
            })
        }).catch((err) => {
            reject({
                status: 404,
                message: "Error:- Request not found"
            })
        })
    })
}

this.countNewRequests = () => {
  return new Promise ((resolve, reject) => {
    ReqSchema.countDocuments({dataType: "Pending"}).exec().then((data) => {
      resolve ({
        status: 200,
        message: data
      })
    }).catch ((err) => {
      reject ({
        status: 500,
        message: "Error: " + err.message
      })
    })
  })
}

this.getFromMember = (id) => {
  return new Promise((resolve, reject) => {
    ReqSchema.findOne({
          memberID: id
      }).exec().then((data) => {
          resolve({
              status: 200,
              message: data
          })
      }).catch((err) => {
          reject({
              status: 404,
              message: "Error:- Request not found"
          })
      })
  })
}


this.update = (data) => {
    return new Promise((resolve, reject) => {
      ReqSchema.update(
            { _id: data._id }, data).then((updatedReq) => {
                resolve({
                    status: 200,
                    message: updatedReq
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: "Error:- " + err
                })
            })
    })
}

this.delete = (id) => {
    return new Promise((resolve, reject) => {
      ReqSchema.deleteOne({ _id: id }).then(() => {
            resolve({
                status: 200,
                message: "Request Removed"
            })
        }).catch((err) => {
            reject({
                status: 500,
                message: "Error:- " + err
            })
        })
    })
}


}

module.exports = new Controller();
