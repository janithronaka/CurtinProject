export interface Membership {
  _id: string;
  dataType: string;
  memberName: string;
  preferredName: string;
  nicNo: string;
  memberId: string;
  approvalChange: string;
  memberDob: string;
  nationality: string;
  religion: string;
  addmisionDate: string;
  addmissionNo: string;
  leavingDate: string;
  registrationDate: string;
  receiptNo: string;
  civilStatus: string;
  childrenCount: number;
  homeAddress: string;
  homeTel: string;
  mobileNo: string;
  personalEmail: string;
  memberOccup: string;
  memberWorkArea: string;
  memberEmployer: string;
  memberWorkAddress: string;
  memberWorkTel: string;
  memberWorkEmail: string;
  olYear: string;
  alYear: string;
  degreeDetails: Degree [];
  otherQualif: OtherEducation [];
  interests: Interest [];
  spouseName: string;
  spouseDOB: string;
  spouseNic: string;
  spouseOccup: string;
  spouseWorkArea: string;
  spouseWorkAddress: string;
  spouseWorkTel: string;
  spouseEmail: string;
  childrenInfo: Child [];
  refName: string;
  refEmail: string;
}

export interface Degree {
  degreeProgram: string;
  university: string;
  degreeYear: string;
}

export interface OtherEducation {
  diplomaName: string;
  institute: string;
  diplomaYear: string;
}

export interface Interest {
  interestType: string;
  interestDesc: string;
}

export interface Child {
  childName: string;
  childDob: string;
  childSchool: string;
}
