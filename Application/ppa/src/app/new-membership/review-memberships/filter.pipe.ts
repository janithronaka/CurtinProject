import { Pipe, PipeTransform } from '@angular/core';
import { Membership } from '../membership/membership.model';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(memberships: Membership[], searchText: string, sortMode: string): any[] {
    // if the array is empty the pipe returns an empty array
    if (!memberships) {
      return [];
    }
    if (!searchText) {
      return memberships.filter( membership => {
        // if the search text is not provided pipe only filters by the membership status
         return this.validateRecordType(membership.dataType, sortMode);
      });
    }
    searchText = searchText.toLowerCase();
    return memberships.filter( membership => {
          return (this.findInName(membership.memberName, searchText) ||
                    this.findInSpouseName(membership.spouseName, searchText) ||
                    this.findInNic(membership.nicNo, searchText) ||
                    this.findInOccupation(membership.memberOccup, searchText)) &&
                    this.validateRecordType(membership.dataType, sortMode);
        });
    }

    // filter by request status
    validateRecordType(type: string, sortMode: string) {
      if (sortMode === 'all') {
        return true;
      } else if (sortMode === 'pending') {
        return (type.toLowerCase() === 'request');
      } else if (sortMode === 'accepted') {
        return (type.toLowerCase() === 'profile');
      } else if (sortMode === 'rejected') {
        return (type.toLowerCase() === 'rejected');
      }
    }

    // filter by member name
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

    // filter by spouse name
    findInSpouseName(name: string, search: string) {
      let found = false;
      if (name !== '' && name != null) {
        const names = name.split(' ');
        for (let index = 0; index < names.length; index++) {
          if (!found) {
            if (names[index].toLowerCase().includes(search.toLowerCase())) {
              found = true;
            }
          }
        }
      }
      return found;
    }

    // filter by NIC
    findInNic(fieldText: string, search: string) {
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
