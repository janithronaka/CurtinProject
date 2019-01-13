var ProjectService = require('./project.service');
var Services = require('../util/services');
var LogController = require('../log/log.controller');

function Controller() {
    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            ProjectService.insert(data).then((resData) => {
                LogController.insert({ type: 'SYSTEM', action: 'Project Created' });
                Services.sendMail("Project Created", "Project Created and Log entry added!", "thetriplet3@gmail.com");
                LogController.insert({ type: 'MAIL', action: 'Mail Sent' });
                resolve({
                    status: resData.status,
                    message: resData.message
                })
            }).catch((err) => {
                reject({
                    status: err.status,
                    message: err.message
                })
            })
        });
    }
    this.getAll = (filter) => {
        var response = ProjectService.getAll(filter);
        return response;
    };

    this.getAll = () => {
        var response = ProjectService.getAll();
        return response;
    };

    this.get = (id) => {
        var response = ProjectService.get(id);
        return response;
    };

    this.getNextProject = () => {
        var response = ProjectService.getNext();
        return response;
    };

    this.update = (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            this.get(data.projectId).then((resData) => {
                if (data.status == 'Completed') {
                    var isTaksCompleted = true;
                    if (resData.tasks != null) {
                        for (var i = 0; i < resData.tasks.length; i++) {
                            if (resData.tasks[i].completed == false) {
                                isTaksCompleted = false;
                                break;
                            }
                        }
                    }
                    if (!isTaksCompleted) {
                        reject({
                            status: 500,
                            message: "Please complete all the tasks before completing the project"
                        });
                        return;
                    }
                }
                ProjectService.update(data).then((resData) => {
                    resolve({
                        status: resData.status,
                        message: resData.message
                    });
                }).catch((err) => {
                    reject({
                        status: err.status,
                        message: err.message
                    });
                })
            }).catch((err) => {
                reject({
                    status: err.status,
                    message: err.message
                });
            })
        })
    };

    this.delete = (id) => {
        var response = ProjectService.delete(id);
        return response;
    };
}

module.exports = new Controller();
