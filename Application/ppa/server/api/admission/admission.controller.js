var AdmissionSchema = require('./Admission.service');

function Controller() {
  this.insert = (data) => {
    console.log(data);
    var response = AdmissionSchema.insert(data).then();
    return response;
  };

  // return all the admission objects
  this.getAll = (filter) => {
    var response = AdmissionSchema.getAll(filter);
    return response;
  };

  // return the relevant admission aplication
  this.get = (id) => {
    var response = AdmissionSchema.get(id);
    return response;
  }

  // update the admission aaplication
  this.update = (data) => {
    var response = AdmissionSchema.update(data);
    return response;
  }

  // delete the admission application
  this.delete = (id) => {
    var response = AdmissionSchema.delete(id);
    return response;
  }
}

module.exports = new Controller();
