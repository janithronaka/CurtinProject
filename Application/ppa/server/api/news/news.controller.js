var NewsService = require('./news.service');

function Controller() {
    this.insert = (data) => {
        var response = NewsService.insert(data);
        return response;
    };

    this.getAll = () => {
        var response = NewsService.getAll();
        return response;
    };

    this.get = (id) => {
        var response = NewsService.get(id);
        return response;
    }

    this.update = (data) => {
        var response = NewsService.update(data);
        return response;
    }

    this.delete = (id) => {
        var response = NewsService.delete(id);
        return response;
    }
}

module.exports = new Controller();
