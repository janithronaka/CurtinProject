import { Pipe, PipeTransform } from '@angular/core';
import { RequestModel } from '../letter-request/request.model';

@Pipe({
  name: 'letterfilter'
})
export class LetterFilterPipe implements PipeTransform {
  transform(requests: RequestModel[], searchText: string, sortProgress: string, sortType: string): any[] {
    if (!requests) {
      return [];  // return an empty array of the requests are not available
    }
    if (!searchText) {
      return requests.filter( request => {
        // if search text is not provided filter only by request status and request type
         return this.sortByRequestProgress(request.progress, sortProgress) && this.sortByRequestType(request.type, sortType);
      });
    }
    searchText = searchText.toLowerCase();  // change the search text case to lower case before searching
    return requests.filter( ltrRequest => {
          return (this.findInRemarks(ltrRequest.remark, searchText)) && // search in remarks field
                    this.sortByRequestProgress(ltrRequest.progress, sortProgress) &&  // filter by the request status
                    this.sortByRequestType(ltrRequest.type, sortType);  // filter by the request type
        });
    }

    // search in remarks field
    findInRemarks(remarks: string, search: string) {
      if (remarks !== '' && remarks != null) {
        return remarks.includes(search);  // return true if the search text contains in the remarks, otherwise return false
      }
      return false;
    }

    // filter by status
    sortByRequestProgress(progress: string, sortProgress: string) {
      if (sortProgress === 'all') {
        return true;
      }
      return (progress.toLowerCase() === sortProgress.toLowerCase());
    }

    // filter by type
    sortByRequestType(type: string, sortType: string) {
      if (sortType === 'all') {
        return true;
      }
      return (type.toLowerCase() === sortType.toLowerCase());
    }

    // findInName(name: string, search: string) {
    //   const names = name.split(' ');
    //   let found = false;
    //   for (let index = 0; index < names.length; index++) {
    //     if (!found) {
    //       if (names[index].toLowerCase().includes(search.toLowerCase())) {
    //         found = true;
    //       }
    //     }
    //   }
    //   return found;
    // }
}
