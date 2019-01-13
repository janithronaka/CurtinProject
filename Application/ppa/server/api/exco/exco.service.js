var mongoose = require('./exco.model');
var ExcoSchema = mongoose.model('exco');

function Controller() {

  this.insert = (data) => {
    return new Promise((resolve, reject) => {
        var exco = new ExcoSchema(data);
        console.log(exco);
        exco.save().then((newExco) => {
            console.log('Exco inserted')
            resolve({
                status: 201,
                message: newExco
            })
        }).catch((err) => {
            console.log()
            reject({
                status: 500,
                message: err
            })
        })
    })
};


    this.getAll = () => {
        return new Promise((resolve, reject) => {
          ExcoSchema.find().then((data) => {
                resolve({
                    status: 200,
                    message: data
                })
            }).catch((err) => {
                console.log(err);
                reject({
                    status: 500,
                    message: "Error " + err
                })
            })

        })
    };

    this.get = (date_from, date_to) => {
        return new Promise((resolve, reject) => {
          ExcoSchema.findOne({
            date_from: date_from, date_to: date_to
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    message: data
                })
            }).catch((err) => {
                reject({
                    status: 404,
                    message: "Error:- Exco not found "
                })
            })
        })
    }

    this.update = (data) => {
        return new Promise((resolve, reject) => {
          ExcoSchema.update(
                { _id: data._id }, data).then((updatedExco) => {
                    resolve({
                        status: 200,
                        message: updatedExco
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
        ExcoSchema.deleteOne({ _id: id}).then(() => {
              resolve({
                  status: 200,
                  message: "Exco deleted"
              })
          }).catch((err) => {
              reject({
                  status: 500,
                  message: err
              })
          })
      })
  }

  this.getById = (id) => {
    return new Promise((resolve, reject) => {
      ExcoSchema.findOne({
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

this.getByMemId = (id) => {
  return new Promise((resolve, reject) => {
    ExcoSchema.findOne({
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

}

module.exports = new Controller();
