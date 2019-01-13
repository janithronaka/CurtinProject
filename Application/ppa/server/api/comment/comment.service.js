var mongoose = require('./comment.model');
var CommentSchema = mongoose.model('Comment');

function Controller() {

  // insert comment method
    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            var comment = new CommentSchema(data);
            comment.save().then((newComment) => {
                console.log('Comment Added')
                resolve({
                    status: 201,
                    message: newComment
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

    this.getNewCommentsCount = () => {
      return new Promise((resolve, reject) => {
        CommentSchema.count({ read: "0" })
          .exec()
          .then(data => {
            resolve({
              status: 200,
              message: data
            });
          })
          .catch(err => {
            reject({
              status: 500,
              message: "Error: " + err.message
            });
          });
      });
    };

    // get all comments method
    this.getAll = () => {
        return new Promise((resolve, reject) => {
          CommentSchema.find().then(data => {
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

    // get comment method
    this.get = (id) => {
        return new Promise((resolve, reject) => {
          CommentSchema.findOne({
                _id: id
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    message: data
                })
            }).catch((err) => {
                reject({
                    status: 404,
                    message: "Error:- Comment not found"
                })
            })
        })
    }

    // update comment method
    this.update = (data) => {
        return new Promise((resolve, reject) => {
          CommentSchema.update(
                { _id: data._id }, data).then((updatedComment) => {
                    resolve({
                        status: 200,
                        message: updatedComment
                    })
                }).catch((err) => {
                    reject({
                        status: 500,
                        message: "Error:- " + err
                    })
                })
        })
    }

    // delete comment method
    this.delete = (id) => {
        return new Promise((resolve, reject) => {
          CommentSchema.deleteOne({ _id: id }).then(() => {
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
