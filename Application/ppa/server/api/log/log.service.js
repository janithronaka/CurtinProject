var mongoose = require('./log.model');
var LogSchema = mongoose.model('Log');

function Controller() {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            var Log = new LogSchema(data);
            Log.save().then((newLog) => {
                console.log('Log inserted')
                resolve({
                    status: 201,
                    message: newLog
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
            LogSchema.find().then((data) => {
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
            LogSchema.findOne({
                logId: id
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    message: data
                })
            }).catch((err) => {
                reject({
                    status: 404,
                    message: "Error:- Log not found "
                })
            })
        })
    }

    this.update = (data) => {
        return new Promise((resolve, reject) => {
            LogSchema.update(
                { logId: data.logId }, data).then((updatedLog) => {
                    resolve({
                        status: 200,
                        message: updatedLog
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
            LogSchema.deleteOne({ logId: id }).then(() => {
                resolve({
                    status: 200,
                    message: "Log deleted"
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
