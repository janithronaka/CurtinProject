var mongoose = require('./post.model');
var PostSchema = mongoose.model('Post');

function Controller() {
    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            var Post = new PostSchema(data);
            Post.save().then((newPost) => {
                console.log('Post inserted')
                resolve({
                    status: 201,
                    message: newPost
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

    this.getAllPosts = (projectId) => {
        var filter = {projectId: projectId};
        console.log(filter);
        return new Promise((resolve, reject) => {
            PostSchema.find(filter).populate('comments').sort({ createdDate: -1 }).exec().then((data) => {
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
            PostSchema.find().populate('comments').exec().then((data) => {
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
            PostSchema.findOne({
                postId: id
            }).populate('comments').exec().then((data) => {
                resolve({
                    status: 200,
                    message: data
                })
            }).catch((err) => {
                reject({
                    status: 404,
                    message: "Error:- Post not found "
                })
            })
        })
    }

    this.update = (data) => {
        return new Promise((resolve, reject) => {
            PostSchema.updateOne(
                { postId: data.postId }, data).then((updatedPost) => {
                    resolve({
                        status: 200,
                        message: updatedPost
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
            PostSchema.deleteOne({ postId: id }).then((data) => {
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
