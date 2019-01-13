import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MembershipService } from 'src/app/new-membership/membership/membership.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-letter-gen',
  templateUrl: './letter-gen.component.html',
  styleUrls: ['./letter-gen.component.css']
})
export class LetterGenComponent implements OnInit {
  filterStatus = 'All';
  router;
  memberId = '123';
  memberName = '';
  selected = 'All';
  selectedSize = '10';
  fontSize = '10';
  orientation = 'p';
  selectedOri = 'p';
  updatingAcc: any;
  ctrlMem = new FormControl();
  private subs: Subscription;
  loading = false;
  public membershipService: MembershipService;
  balArr = new Array(1000);
  bal = 0;
  admDate = '';
  leaveDate = '';
  content = '';


  constructor(membershipService: MembershipService, public snackBar: MatSnackBar, public route: ActivatedRoute) {
    this.membershipService = membershipService;
  }


  ngOnInit(): void {

  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('memberId')) {
      this.memberId = paramMap.get('memberId');
      this.loading = true;
      this.membershipService.getMembershipByMemberId(this.memberId).subscribe(accountData => {
        const json_data = JSON.stringify(accountData);
        const aadat = JSON.parse(json_data);
        this.updatingAcc = {
          _id: aadat._id,
          memberName: aadat.memberName,
          preferredName: aadat.preferredName,
          memberDob: aadat.memberDob,
          nationality: aadat.nationality,
          religion: aadat.religion,
          addmisionDate: aadat.addmisionDate,
          leavingDate: aadat.leavingDate,
          mobileNo: aadat.mobileNo,
          personalEmail: aadat.personalEmail,
          nicNo: aadat.nicNo,
          addmissionNo: aadat.addmissionNo,
          homeAddress: aadat.homeAddress
        };
        this.memberName = this.updatingAcc.memberName;
        this.admDate = this.updatingAcc.addmisionDate.split('T')[0];
        this.leaveDate = this.updatingAcc.leavingDate.split('T')[0];
        this.ctrlMem.disable();
        this.content = `This is to certify that Ms. ${this.memberName} was a student
of Sirimavo Bandaranayake Vidyalaya. ${this.memberName} joined
Sirimavo Bandaranayake Vidyalaya on ${this.admDate} and left on ${this.leaveDate}.

${this.memberName} was a team oriented individual, who developed good
working relationships with her colleagues. The staff and
her peers appreciated her honesty, commitment and integrity which are
unquestionable.`;
        this.loading = false;
      });



    } else {
      this.router = Router;
      this.router.parent.navigate(['/']);
    }
  });
  }

  downloadPDF() {
    const pdf = new jsPDF(this.orientation, 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    this.loading = true;


    const source =
      `<!DOCTYPE html>
                      <html>
                      <body>
                      ${this.updatingAcc.homeAddress}
                      <h5>TO WHOM IT MAY CONCERN</h5><br/> <br/>
                      <p>` +
                      this.content + `</p><br/> <br/> <br/>
                      .................<br/>
                      Principal,<br/>
                      Sirimavo Bandaranayake Vidyalaya.
                      </body>
                      </html>`;
    // we support special element handlers. Register them with jQuery-style
    // ID selector for either ID or node name. ('#iAmID', 'div', 'span' etc.)
    // There is no support for any other type of selectors
    // (class, of compound) at this time.
    const specialElementHandlers = {
      // element with id of 'bypass' - jQuery style selector
      '#bypassme': function(element, renderer) {
        // true = 'handled elsewhere, bypass text extraction'
        return true;
      }
    };
    const margins = {
      top: 100,
      bottom: 60,
      left: 80,
      width: 450
    };
    this.loading = false;
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top,
      {
        // y coord
        width: margins.width, // max width of content on PDF
        elementHandlers: specialElementHandlers
      },

      function(dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
        pdf.save('Letter.pdf');
      },
      margins
    );
    this.loading = false;





  }
}
