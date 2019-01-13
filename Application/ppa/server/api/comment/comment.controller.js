var CommentService = require('./comment.service');

function Controller() {
  // Insert comment wrapper method
    this.insert = (data) => {
        var response = CommentService.insert(data);
        return response;
    };

    // Get all comments wrapper method
    this.getAll = () => {
        var response = CommentService.getAll();
        return response;
    };

    // Get comment wrapper method
    this.get = (id) => {
      var response = CommentService.get(id);
      return response;
  }

  this.newComments = () => {
    console.log('recieved request');
    var response = CommentService.getNewCommentsCount();
    return response;
  }

    // update comment wrapper method
    this.update = (data) => {
        var response = CommentService.update(data);
        return response;
    }

    // Delete comment wrapper method
    this.delete = (id) => {
        var response = CommentService.delete(id);
        return response;
    }
}

module.exports = new Controller();
