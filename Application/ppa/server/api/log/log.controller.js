var LogService = require('./log.service');

function Controller() {
    this.insert = (data) => {
        var response = LogService.insert(data);
        return response;
    };

    this.getAll = () => {
        var response = LogService.getAll();
        return response;
    };

    this.get = (id) => {
        var response = LogService.get(id);
        return response;
    }

    this.update = (data) => {
        var response = LogService.update(data);
        return response;
    }

    this.delete = (id) => {
        var response = LogService.delete(id);
        return response;
    }
}

module.exports = new Controller();
