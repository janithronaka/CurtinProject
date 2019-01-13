var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
  dataType: {
    type: String,
    required: false,
    enum: ['Profile', 'Request', 'Rejected'],
    default: 'Request'
  },
  memberName: {
    type: String,
    required: true
  },
  preferredName: {
    type: String,
    required: true
  },
  memberId: {
    type: String
  },
  approvalChange: {
    type: String,
    required: false,
    enum: ['0', '1'],
    default: '0'
  },
    nicNo: {
        type: String,
        required: true
    },
    memberDob: {
        type: String,
        required: false
    },
    nationality: {
      type: String,
      required: true
    },
    religion: {
        type: String,
        required: true
    },
    addmisionDate: {
      type: String,
      required: true
    },
    addmissionNo: {
        type: String
    },
    leavingDate: {
      type: String,
      required: false
    },
    registrationDate: {
      type: String,
      required: true
    },
    receiptNo: {
      type: String
    },
    civilStatus: {
      type: String,
      required: true
    },
    childrenCount: {
      type: String
    },
    homeAddress: {
      type: String,
      required: true
    },
    homeTel: {
      type: String
    },
    mobileNo: {
      type: String,
      required: true
    },
    personalEmail: {
      type: String
    },
    memberOccup: {
      type: String,
      required: true
    },
    memberWorkArea: {
      type: String,
      required: true
    },
    memberEmployer: {
      type: String
    },
    memberWorkAddress: {
      type: String
    },

    memberWorkTel: {
      type: String
    },
    memberWorkEmail: {
      type: String
    },
    olYear: {
      type: String,
      required: true
    },
    alYear: {
      type: String
    },
    degreeDetails: [{
      degreeProgram: String,
      university: String,
      degreeYear: String
    }],
    otherQualif: [{
      diplomaName: String,
      institute: String,
      diplomaYear: String
    }],
    interests: [{
      interestType: String,
      interestDesc: String
    }],
    spouseName: String,
    spouseDOB: String,
    spouseNic: String,
    spouseOccup: String,
    spouseWorkArea: String,
    spouseWorkAddress: String,
    spouseWorkTel: String,
    spouseEmail: String,
    childrenInfo: [{
      childName: String,
      childDob: String,
      childSchool: String
    }],
    refName: String,
    refEmail: String
});

mongoose.model('Member', MemberSchema);

module.exports = mongoose;
