var mongoose = require('./task.model');
var TaskSchema = mongoose.model('Task');

function Controller() {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            var Task = new TaskSchema(data);
            Task.save().then((newTask) => {
                console.log('Task inserted')
                resolve({
                    status: 201,
                    message: newTask
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

    this.getAllTasks = (projectId) => {
        return new Promise((resolve, reject) => {
            TaskSchema.find({projectId: projectId}).exec().then((data) => {
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

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            TaskSchema.find().exec().then((data) => {
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

    this.getNext = () => {
        return new Promise((resolve, reject) => {
            TaskSchema.findOne().sort({ createdDate: -1 }).exec().then((data) => {
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
            TaskSchema.findOne({
                taskId: id
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    message: data
                })
            }).catch((err) => {
                reject({
                    status: 404,
                    message: "Error:- Task not found "
                })
            })
        })
    }

    this.update = (data) => {
        return new Promise((resolve, reject) => {
            TaskSchema.update(
                { taskId: data.taskId }, data).then((updatedTask) => {
                    resolve({
                        status: 200,
                        message: updatedTask
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
            TaskSchema.deleteOne({ taskId: id }).then((data) => {
                resolve({
                    status: 200,
                    message: data
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
