var LoginService = require('./login.service');

function Controller() {

  this.insert = (data) => {
    var response = LoginService.insert(data);
    return response;
};

    this.getAll = (filter) => {
        var response = LoginService.getAll(filter);
        return response;
    };

    this.get = (id) => {
        var response = LoginService.get(id);
        return response;
    }

    this.update = (data) => {
        var response = LoginService.update(data);
        return response;
    }


    this.delete = (id) => {
      var response = LoginService.delete(id);
      return response;
  }

}

module.exports = new Controller();
