var ExcoService = require('./exco.service');

function Controller() {

  this.insert = (data) => {
    var response = ExcoService.insert(data);
    return response;
};

    this.getAll = (filter) => {
        var response = ExcoService.getAll(filter);
        return response;
    };

    this.get = (date_from, date_to) => {
        var response = ExcoService.get(date_from, date_to);
        return response;
    }

    this.update = (data) => {
        var response = ExcoService.update(data);
        return response;
    }


    this.delete = (id) => {
      var response = ExcoService.delete(id);
      return response;
  }

    this.getById = (id) => {
    var response = ExcoService.getById(id);
    return response;
}

this.getByMemId = (id) => {
  var response = ExcoService.getByMemId(id);
  return response;
}

}

module.exports = new Controller();
