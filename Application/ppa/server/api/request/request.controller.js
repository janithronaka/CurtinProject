var ReqService = require('./request.service');

function Controller() {

  this.insert = (data) => {
    var response = ReqService.insert(data);
    return response;
};

    this.getAll = (filter) => {
        var response = ReqService.getAll(filter);
        return response;
    };

    this.get = (id) => {
        var response = ReqService.get(id);
        return response;
    }

    // returns pending letter requests count
    this.countNewRequests = () => {
      var response = ReqService.countNewRequests();
      return response;
    }

    this.getByMemberId = (id) => {
      var response = ReqService.getFromMember(id);
      return response;
    }

    this.update = (data) => {
      var response = ReqService.update(data);
      return response;
  }


    this.delete = (id) => {
      var response = ReqService.delete(id);
      return response;
    }

}

module.exports = new Controller();
