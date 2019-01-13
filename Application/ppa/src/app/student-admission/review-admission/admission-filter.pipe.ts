import { Pipe, PipeTransform } from '@angular/core';
import { AdmissionModel } from '../admission.model';
@Pipe({
  name: 'admissonfilter'
})
export class AdmissionFilterPipe implements PipeTransform {
  transform(admissions: AdmissionModel[], searchText: string, sortMode: string): any[] {
    // if the array is empty the pipe returns an empty array
    if (!admissions) {
      return [];
    }
    if (!searchText) {
      return admissions.filter( membership => {
         return this.validateRecordType(membership.status, sortMode);
      });
    }
    searchText = searchText.toLowerCase();
    return admissions.filter( admission => {
          return (this.findInName(admission.applicantName, searchText) ||
                    this.findInOccupation(admission.memberOccupation, searchText) ||
                    this.findInMemberId(admission.membershipId, searchText) &&
                    this.validateRecordType(admission.status, sortMode));
        });
    }

    // filter by admissions status
    validateRecordType(type: string, sortMode: string) {
      if (sortMode === 'all') {
        return true;
      } else if (sortMode === 'pending') {
        return (type.toLowerCase() === 'pending');
      } else if (sortMode === 'reviewed') {
        return (type.toLowerCase() === 'reviewed');
      } else if (sortMode === 'rejected') {
        return (type.toLowerCase() === 'rejected');
      }
    }

    // filter by applicant's name
    findInName(name: string, search: string) {
      const names = name.split(' ');
      let found = false;
      for (let index = 0; index < names.length; index++) {
        if (!found) {
          if (names[index].toLowerCase().includes(search.toLowerCase())) {
            found = true;
          }
        }
      }
      return found;
    }

    // filter by occupation
    findInMemberId(fieldText: string, search: string) {
      let found = false;
      if (fieldText !== '' && fieldText != null) {
        const texts = fieldText.split(' ');
        for (let index = 0; index < texts.length; index++) {
          if (!found) {
            if (texts[index].toLowerCase().includes(search.toLowerCase())) {
              found = true;
            }
          }
        }
      }
      return found;
    }

    // filter by occupation
    findInOccupation(fieldText: string, search: string) {
      let found = false;
      if (fieldText !== '' && fieldText != null) {
        const texts = fieldText.split(' ');
        for (let index = 0; index < texts.length; index++) {
          if (!found) {
            if (texts[index].toLowerCase().includes(search.toLowerCase())) {
              found = true;
            }
          }
        }
      }
      return found;
    }
}
