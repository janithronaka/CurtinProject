var MemberSchema = require('./membership.service');
var Services = require('../util/services');

function Controller() {
    this.insert = (data) => {
        var response = MemberSchema.insert(data).then();
        return response;
    };

    this.getAll = (filter) => {
        var response = MemberSchema.getAll(filter);
        return response;
    };

    this.get = (id) => {
      var response = MemberSchema.get(id);
      return response;
    }

    this.getAllDir = (pageSize, currPage, filter, value) => {
      var response = MemberSchema.getAllDir(pageSize, currPage, filter, value);
      return response;
    }

    // returns the active profiles count
    this.countMembershipProfiles = () => {
      var response = MemberSchema.getProfileCount();  // call the relevent method in MemberSchema
      return response;
    }

    // returns the pending membership requests count
    this.countMembershipRequests = () => {
      var response = MemberSchema.getNewRequestCount(); // call the relevent method in MemberSchema
      return response;
    }

  this.getByMemberId = (id) => {
    var response = MemberSchema.getbyMemberId(id);
    return response;
  }

  this.getByObjId = (id) => {
    var response = MemberSchema.getbyObjId(id);
    return response;
  }

    // update the memebership request
    this.update = (data) => {
      return new Promise((resolve, reject) => {
        MemberSchema.update(data).then((resData) => {
          let email = '';
          // check wether the update is a status update or some other update
          if (data.approvalChange === '1') {
            if (data.dataType === 'Profile') {  // if the request is accepted
              if (data.personalEmail && data.personalEmail != null && data.personalEmail !== '') {  //get the valid email address of the member
                  email = data.personalEmail;
                } else if (data.refEmail && data.refEmail != null && data.refEmail !== '') {
                  email = data.refEmail;
                }
                // email body
                let messageBody =
                `Congratulations! Your membership request is approved.
                Your Member Id is ${data.memberId}.
                Please use this Id to login to the system. -- Active Email - ${email}`;
                // sending the email
                Services.sendMail("Past Pupils Association of Sirimavo Bandaranaike Vidyalaya - Membership Approved", messageBody, "janithronaka@gmail.com");
            } else if (data.dataType === 'Rejected') {  // if the request is rejected
                if (data.personalEmail && data.personalEmail != null && data.personalEmail !== '') {
                    email = data.personalEmail;
                  } else if (data.refEmail && data.refEmail != null && data.refEmail !== '') {
                    email = data.refEmail;
                  }
                  let messageBody =
                  `We are sorry to inform you that your membership requested is rejected.`;
                    Services.sendMail("Past Pupils Association of Sirimavo Bandaranaike Vidyalaya - Membership Rejected", messageBody, "janithronaka@gmail.com");
            }
            // another update call to reset the approvalChange field value
            data.approvalChange = '0';
            return MemberSchema.update(data);
          }
            resolve({
                status: resData.status,
                message: resData.message
            })
        }).catch((err) => {
            reject({
                status: err.status,
                message: err.message
            })
        })
    });
    }

    this.delete = (id) => {
        var response = MemberSchema.delete(id);
        return response;
    }
}

module.exports = new Controller();
