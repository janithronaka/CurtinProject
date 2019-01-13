var mongoose = require('./news.model');
var NewsSchema = mongoose.model('News');

function Controller() {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            var News = new NewsSchema(data);
            News.save().then((newNews) => {
                console.log('News Added')
                resolve({
                    status: 201,
                    message: newNews
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
          NewsSchema.find().then(data => {
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
          NewsSchema.findOne({
                _id: id
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    message: data
                })
            }).catch((err) => {
                reject({
                    status: 404,
                    message: "Error:- News not found"
                })
            })
        })
    }

    this.update = (data) => {
        return new Promise((resolve, reject) => {
          NewsSchema.update(
                { _id: data._id }, data).then((updatedNews) => {
                    resolve({
                        status: 200,
                        message: updatedNews
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
          NewsSchema.deleteOne({ _id: id }).then(() => {
                resolve({
                    status: 200,
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
