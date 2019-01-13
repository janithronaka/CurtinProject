var mongoose = require('../../dbConfig');
var Schema = mongoose.Schema;

var AdmissionSchema = new Schema({
  status: {
    type: String,
    required: false,
    enum: ['Pending', 'Reviewed', 'Rejected'],
    default: 'Pending'
  },
  applicantName:  {
    type: String,
    required: true
  },
  applicantDob:  {
    type: String,
    required: true
  },
  contactNo:  {
    type: String,
    required: true
  },
  memberOccupation:  {
    type: String,
    required: true
  },
  spouseName:  {
    type: String,
    required: true
  },
  spouseOccupation:  {
    type: String,
    required: false
  },
  currentStudents: {
    type: String,
    required: true
  },
  currentStudentsArray: [{
      student: String,
      admissionYear: String,
      grade: String
  }],
  coCategory:  {
    type: String,
    required: false
  },
  ogaCategory:  {
    type: String,
    required: false
  },
  sisterCategory:  {
    type: String,
    required: false
  },
  educationServiceCategory:  {
    type: String,
    required: false
  },
  transferCategory:  {
    type: String,
    required: false
  },
  foreignCategory:  {
    type: String,
    required: false
  },
  armedForces:  {
    type: String,
    required: false
  },
  schoolYears:  {
    type: String,
    required: true
  },
  schoolYearsMarks:  {
    type: String,
    required: false
  },
  educationalAchievementsMarks: {
    type: String,
    required: false
  },
  extraCurricularMarks: {
    type: String,
    required: false
  },
  afterSchoolMarks: {
    type: String,
    required: false
  },
  scholarship:  {
    type: String,
    required: true
  },
  olA: {
    type: String,
    required: false
  },
  olB: {
    type: String,
    required: false
  },
  olC: {
    type: String,
    required: false
  },
  olS: {
    type: String,
    required: false
  },
  alSub1: {
    type: String,
    required: false
  },
  alSub1Result: {
    type: String,
    required: false
  },
  alSub2: {
    type: String,
    required: false
  },
  alSub2Result: {
    type: String,
    required: false
  },
  alSub3: {
    type: String,
    required: false
  },
  alSub3Result: {
    type: String,
    required: false
  },
  alSub4: {
    type: String,
    required: false
  },
  alSub4Result: {
    type: String,
    required: false
  },
  otherAchievements: [{
    achievement: String,
    year: String
  }],
  leaderships: [{
    lType: String,
    description: String,
    year: String
  }],
  extraCurricularDetails: [{
    eType: String,
    description: String,
    position: String,
    other: String,
    year: String
  }],
  championships: [{
    cType: String,
    description: String,
    place: String,
    year: String
  }],
  others: [{
    description: String,
    year: String
  }],
  membershipId: {
    type: String,
    required: true
  },
  membershipDate:  {
    type: String,
    required: false
  },
  membershipYears:  {
    type: String,
    required: false
  },
  servicesOffered:  {
    type: String,
    required: false
  },
  educationAchievements: [{
    eType: String,
    qualification: String,
    year: String
  }],
  services: [{
    description: String,
    year: String
  }],
  letters: [{
    lType: String,
    letterNo: String,
    description: String
  }],
  donations: [{
    receiptNo: String,
    total: String
  }],
  committee: [{
    post: String,
    year: String
  }]
});

mongoose.model('Admission', AdmissionSchema);

module.exports = mongoose;
