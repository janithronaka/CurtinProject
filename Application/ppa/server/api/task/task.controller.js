var TaskService = require('./task.service');
var Services = require('../util/services');
var LogController = require('../log/log.controller');
var PostService = require('../post/post.service');

function Controller() {
    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            TaskService.insert(data).then((resData) => {
                LogController.insert({ type: 'SYSTEM', action: 'Task Created' });
                var postDescription = "Task " + resData.message.taskId + " created";
                var newPost = {
                    description: postDescription,
                    projectId: resData.message.projectId
                }
                PostService.insert(newPost).then((postData) => {
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

            }).catch((err) => {
                reject({
                    status: err.status,
                    message: err.message
                })
            })
        });
    }
    this.getAllTasks = (projectId) => {
        var response = TaskService.getAllTasks(projectId);
        return response;
    };

    this.getAll = () => {
        var response = TaskService.getAll();
        return response;
    };

    this.get = (id) => {
        var response = TaskService.get(id);
        return response;
    };

    this.getNextTask = () => {
        var response = TaskService.getNext();
        return response;
    };

    this.update = (data) => {
        var response = TaskService.update(data);
        return response;
    };

    this.delete = (projectId, id) => {
        return new Promise((resolve, reject) => {
            TaskService.delete(id).then((resData) => {
                LogController.insert({ type: 'SYSTEM', action: 'Task Deleted' });
                var postDescription = "Task " + id + " deleted";
                var newPost = {
                    description: postDescription,
                    projectId: projectId
                }
                PostService.insert(newPost).then((postData) => {
                    resolve({
                        status: resData.status,
                        message: resData.message
                    })
                }).catch((err) => {
                    console.log(err);
                    reject({
                        status: err.status,
                        message: err.message
                    })
                })

            }).catch((err) => {
                reject({
                    status: err.status,
                    message: err.message
                })
            })
        });
    };
}

module.exports = new Controller();
