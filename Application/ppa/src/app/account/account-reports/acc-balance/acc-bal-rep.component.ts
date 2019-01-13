import { Component } from '@angular/core';
import * as jsPDF from 'jspdf';
import { AccountService } from '../../account.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AccountModel } from '../../account.model';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-acc-bal-rep',
  templateUrl: './acc-bal-rep.component.html',
  styleUrls: ['./acc-bal-rep.component.css']
})
export class AccBalRepComponent {
  filterString = '';
  filterOption = 'all';
  filterStatus = 'All';
  selected = 'All';
  selectedSize = '10';
  fontSize = '10';
  orientation = 'p';
  selectedOri = 'p';
  totalAccounts = 0;
  public accountService: AccountService;
  public transactionService: TransactionService;
  private subs: Subscription;
  loading = false;
  accountData: AccountModel[] = [];
  balArr = new Array(1000);
  bal = 0;
  constructor(accountService: AccountService, public snackBar: MatSnackBar, transactionService: TransactionService) {
    this.accountService = accountService;
    this.transactionService = transactionService;
  }

  downloadPDF() {
    const pdf = new jsPDF(this.orientation, 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    this.loading = true;
    this.accountService.getAccounts(
      50,
      1,
      this.filterOption,
      this.filterString
    );
    this.subs = this.accountService
      .getListUpdateListener()
      .subscribe(
        (accountData: {
          accountData: AccountModel[];
          accountCount: number;
        }) => {
          this.accountData = accountData.accountData;
          this.totalAccounts = accountData.accountCount;
          let filterCriteria = ' ';
          if (this.filterString) {
            if (this.filterOption === 'all') {
              filterCriteria +=
                '<br/>Accounts contains "' +
                this.filterString +
                '" in Account.';
            } else if (this.filterOption === 'account') {
              filterCriteria +=
                '<br/>Accounts contains "' +
                this.filterString +
                '" in Account ID.';
            } else if (this.filterOption === 'desc') {
              filterCriteria +=
                '<br/>Accounts contains "' +
                this.filterString +
                '" in Account Description.';
            }
          }
          if (this.filterStatus) {
            if (this.filterStatus === 'Open') {
              filterCriteria +=
                '<br/>Accounts in "' + this.filterStatus + '" State.';
            } else if (this.filterStatus === 'Close') {
              filterCriteria +=
                '<br/>Accounts in "' + this.filterStatus + '" State.';
            }
          }
          if (filterCriteria !== ' ') {
            filterCriteria = 'Filter<br/><i>' + filterCriteria;
          } else {
            filterCriteria = '<i>All Accounts list.';
          }
          let source =
            `<!DOCTYPE html>
                            <html>
                            <head>
                            <style>
                            table {
                                font-family: arial, sans-serif;
                                border-collapse: collapse;
                                width: 100%;
                            }

                            td, th {
                                border: 1px solid #dddddd;
                                text-align: left;
                                padding: 8px;
                            }

                            tr:nth-child(even) {
                                background-color: #dddddd;
                            }
                            </style>
                            </head>
                            <body>
                            <h1>Account Report</h1>
                            <p>` +
                            filterCriteria +
                            `
                            </i></p>
                            <table width="100%" style="font-size:` + this.fontSize + `px;">
                            <tr>
                              <th>Account ID</th>
                              <th>Description</th>
                              <th>Status</th>
                              <th>Balance</th>
                            </tr>`;

          // let count1;

          // for (count1 = 0; count1 < this.accountData.length; count1++) {
          //    this.balArr[count1] =  this.transactionService.accBal(this.accountData[count1].accId);
          // }
          let count;
          for (count = 0; count < this.accountData.length; count++) {
            if (
              this.filterStatus === 'All' ||
              this.filterStatus === this.accountData[count].status
            ) {
              source += '<tr><td>' + this.accountData[count].accId + '</td>';
              source += '<td>' + this.accountData[count].desc + '</td>';
              source += '<td>' + this.accountData[count].status + '</td>';
              source += '<td>' + this.transactionService.accBal(this.accountData[count].accId) + '</td></tr>';
            }
          }
          source += `</table>
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
            top: 60,
            bottom: 60,
            left: 40,
            width: 672
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
              pdf.save('Account Report.pdf');
            },
            margins
          );
          this.loading = false;
        }
      );
  }
}
