export interface AdmissionModel {
  _id: string;
  status: string;
  applicantName: string;
  applicantDob: string;
  contactNo: string;
  memberOccupation: string;
  spouseName: string;
  spouseOccupation: string;
  currentStudents: string;
  currentStudentsArray: Student[];
  coCategory: string;
  ogaCategory: string;
  sisterCategory: string;
  educationServiceCategory: string;
  transferCategory: string;
  foreignCategory: string;
  armedForces: string;
  schoolYears: string;
  scholarship: string;
  olA: string;
  olB: string;
  olC: string;
  olS: string;
  alSub1: string;
  alSub1Result: string;
  alSub2: string;
  alSub2Result: string;
  alSub3: string;
  alSub3Result: string;
  alSub4: string;
  alSub4Result: string;
  otherAchievements: OtherAchievement[];
  schoolYearsMarks: string;
  educationalAchievementsMarks: string;
  extraCurricularMarks: string;
  afterSchoolMarks: string;
  leaderships: Leadership[];
  extraCurricularDetails: ExtraCurricularActivity[];
  championships: Championship[];
  others: Other[];
  membershipId: string;
  membershipDate: string;
  membershipYears: string;
  servicesOffered: string;
  educationAchievements: EducationAchievement[];
  services: Service[];
  letters: Letter[];
  donations: Donation[];
  committee: Committee[];

}

export interface Student {
  student: string;
  admissionYear: string;
  grade: string;
}

export interface OtherAchievement {
  achievement: string;
  year: string;
}

export interface Leadership {
  lType: string;
  description: string;
  year: string;
}

export interface ExtraCurricularActivity {
  eType: string;
  description: string;
  position: string;
  other: string;
  year: string;
}

export interface Championship {
  cType: string;
  description: string;
  place: string;
  year: string;
}

export interface Other {
  description: string;
  year: string;
}

export interface EducationAchievement {
  eType: string;
  qualification: string;
  year: string;
}

export interface Service {
  description: string;
  year: string;
}

export interface Letter {
  lType: string;
  letterNo: string;
  description: string;
}

export interface Donation {
  receiptNo: string;
  total: string;
}

export interface Committee {
  post: string;
  year: string;
}
