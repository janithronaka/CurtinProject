var PostService = require('./post.service');

function Controller() {
    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            PostService.insert(data).then((newPost) => {
                if (newPost.parentPostId != null) {
                    PostService.get(newPost.parentPostId).then((parentPost) => {
                        parentPost.comments.push(newPost._id);
                        PostService.update(parentPost).then((updatedPost) => {
                            resolve({
                                status: parentPost.status,
                                message: parentPost.message
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
                }
                else {
                    resolve({
                        status: newPost.status,
                        message: newPost.message
                    })
                }
            }).catch((err) => {
                reject({
                    status: err.status,
                    message: err.message
                })
            })
        })
    };

    this.getAll = (projectId) => {
        var response = PostService.getAllPosts(projectId);
        return response;
    };

    this.get = (id) => {
        var response = PostService.get(id);
        return response;
    }

    this.update = (data) => {
        var response = PostService.update(data);
        return response;
    }

    this.updateAttachments = (data) => {
        return new Promise((resolve, reject) => {
            PostService.get(data.postId).then((post) => {
                if (!post.message.attachments) {
                    post.message.attachments = [];
                }
                var updatedPost = post.message;
                for (var i in data.attachments) {
                    updatedPost.attachments.push(data.attachments[i]);
                }
                console.log(updatedPost)
                PostService.update(updatedPost).then((uPost) => {
                    resolve({
                        status: uPost.status,
                        message: updatedPost
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
        })
    }

    this.delete = (id) => {
        var response = PostService.delete(id);
        return response;
    }
}

module.exports = new Controller();
