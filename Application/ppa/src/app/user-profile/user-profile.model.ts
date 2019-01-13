export interface Membership {
  _id: string;
  memberName: string;
  nicNo: string;
  memberId: string;
  memberDob: string;
  nationality: string;
  religion: string;
  civilStatus: string;
  childrenCount: number;
  homeAddress: string;
  homeTel: string;
  mobileNo: string;
  personalEmail: string;
  memberOccup: string;
  olYear: string;
  alYear: string;
  degreeDetails: Degree [];
  otherQualif: OtherEducation [];
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


