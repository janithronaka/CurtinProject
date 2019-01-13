var mongoose = require('./login.model');
var LoginSchema = mongoose.model('login');

function Controller() {

  this.insert = (data) => {
    return new Promise((resolve, reject) => {
        var login = new LoginSchema(data);
        login.save().then((newLogin) => {
            console.log('Login inserted')
            resolve({
                status: 201,
                message: newLogin
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
          LoginSchema.find().then((data) => {
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

    this.get = (id) => {
        return new Promise((resolve, reject) => {
          LoginSchema.findOne({
                memberID: id
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    message: data
                })
            }).catch((err) => {
                reject({
                    status: 404,
                    message: "Error:- Login not found "
                })
            })
        })
    }

    this.update = (data) => {
        return new Promise((resolve, reject) => {
          LoginSchema.update(
                { memberID: data.memberID }, data).then((updatedLogin) => {
                    resolve({
                        status: 200,
                        message: updatedLogin
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
        LoginSchema.deleteOne({ memberID: id }).then(() => {
              resolve({
                  status: 200,
                  message: "Member Login deleted"
              })
          }).catch((err) => {
              reject({
                  status: 500,
                  message: err
              })
          })
      })
  }



}

module.exports = new Controller();
