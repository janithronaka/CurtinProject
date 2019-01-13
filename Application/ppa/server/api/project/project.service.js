var mongoose = require('./project.model');
var ProjectSchema = mongoose.model('Project');

function Controller() {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            var Project = new ProjectSchema(data);
            Project.save().then((newProject) => {
                console.log('Project inserted')
                resolve({
                    status: 201,
                    message: newProject
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

    this.getAll = (filter) => {
        return new Promise((resolve, reject) => {
            ProjectSchema.find(JSON.parse(filter)).populate('tasks').exec().then((data) => {
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
            ProjectSchema.find().populate('tasks').exec().then((data) => {
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
            ProjectSchema.findOne().sort({ startingDate: -1 }).exec().then((data) => {
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
            ProjectSchema.findOne({
                projectId: id
            }).populate('tasks').exec().then((data) => {
                resolve({
                    status: 200,
                    message: data
                })
            }).catch((err) => {
                reject({
                    status: 404,
                    message: "Error:- Project not found "
                })
            })
        })
    }

    this.update = (data) => {
        return new Promise((resolve, reject) => {
            ProjectSchema.updateOne(
                { projectId: data.projectId }, data).then((updatedProject) => {
                    resolve({
                        status: 200,
                        message: updatedProject
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
            ProjectSchema.deleteOne({ projectId: id }).then(() => {
                resolve({
                    status: 200,
                    message: "Project deleted"
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
