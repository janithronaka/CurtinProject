import { Component } from '@angular/core';
import * as jsPDF from 'jspdf';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { TransactionModel } from '../../transaction.model';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-acc-transaction-report',
  templateUrl: './acc-transaction.component.html',
  styleUrls: ['./acc-transaction.component.css']
})
export class AccTransactionComponent {
  filterString = '';
  filterOption = 'all';
  accountId: string;
  selected = 'All';
  selectedSize = '10';
  fontSize = '10';
  orientation = 'p';
  selectedOri = 'p';
  dtp1 = new FormControl();
  dtp2 = new FormControl();
  totalTransactions = 0;
  transactionData: TransactionModel[] = [];
  public transactionService: TransactionService;
  private subs: Subscription;
  loading = false;

  constructor(transactionService: TransactionService, public snackBar: MatSnackBar) {
    this.transactionService = transactionService;
  }

  isValidateSearch () {
    let err = false;
    if (this.filterOption === 'amount') {
      this.openSnackBar('Please enter numeric value.', null);
      return false;
    }
    if (this.dtp1.enabled === true) {
      if (this.dtp1.value === null) {
        this.dtp1.setErrors({'incorrect': true});
        this.dtp1.markAsTouched();
        err = true;
      }
      if (this.dtp2.value === null) {
        this.dtp2.setErrors({'incorrect': true});
        this.dtp2.markAsTouched();
        err = true;
      }
      if (err) {
        this.openSnackBar('Please select date range.', null);
        return false;
      }
      if (this.dtp1.value > this.dtp2.value) {
        this.openSnackBar('Error: From date is greater than until date.', null);
        return false;
      }
    }
    return true;
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action ? 'Action Label' : 'Hide', {
      duration: 3000,
    });
  }

  downloadPDF() {
    if (!this.isValidateSearch()) {
      return;
    }
    const pdf = new jsPDF(this.orientation, 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    this.loading = true;

    this.transactionService
    .getTransactions(1000, 1, this.accountId, this.filterOption, this.filterString, this.dtp1.value, this.dtp2.value);
    this.subs = this.transactionService.getListUpdateListener()
      .subscribe((transactionData: {transactionData: TransactionModel[], transactionCount: number}) => {
      this.loading = false;
      this.transactionData = transactionData.transactionData;
      this.totalTransactions = transactionData.transactionCount;
          let filterCriteria = ' ';
          if (this.filterString) {
            if (this.filterOption === 'all') {
              filterCriteria +=
                '<br/>Transaction contains "' +
                this.filterString +
                '" in Transaction.';
            } else if (this.filterOption === 'account') {
              filterCriteria +=
                '<br/>Transaction for Account ID "' +
                this.filterString +
                '".';
            } else if (this.filterOption === 'amount') {
              filterCriteria +=
                '<br/>Transaction contains "' +
                this.filterString +
                '" in Amount.';
            } else if (this.filterOption === 'desc') {
              filterCriteria +=
                '<br/>Transaction contains "' +
                this.filterString +
                '" in Description.';
            } else if (this.filterOption === 'entered') {
              filterCriteria +=
                '<br/>Transaction entered by users contining "' +
                this.filterString +
                '" in User ID.';
            } else if (this.filterOption === 'donation') {
              filterCriteria +=
                '<br/>Transaction marked donation as "' +
                this.filterString +
                '".';
            }
          }
          filterCriteria +=
                '<br/>Transactions entered between "' + this.dtp1.value + '" <br/>and "' + this.dtp2.value + '".';
          if (filterCriteria !== ' ') {
            filterCriteria = 'Filter<br/><i>' + filterCriteria;
          } else {
            filterCriteria = '<i>All Transaction list.';
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
                            <h1>Transaction Report</h1>
                            <p>` +
                            filterCriteria +
                            `
                            </i></p>
                            <table width="100%" style="font-size:` + this.fontSize + `px;">
                            <tr>
                              <th>Account ID</th>
                              <th>Description</th>
                              <th>Donation</th>
                              <th>Entered By</th>
                              <th>Entered Date</th>
                              <th>Amount</th>
                            </tr>`;

          let count;

          for (count = 0; count < this.transactionData.length; count++) {
            source += '<tr><td>' + this.transactionData[count].accId + '</td>';
            source += '<td>' + this.transactionData[count].desc + '</td>';
            source += '<td>' + this.transactionData[count].donation + '</td>';
            source += '<td>' + this.transactionData[count].entered + '</td>';
            source += '<td>' + this.transactionData[count].date + '</td>';
            source += '<td>' + this.transactionData[count].amount + '</td></tr>';
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
          // all coords and widths are in jsPDF instance's declared units
          // 'inches' in this case
          this.loading = false;
          pdf.setFontSize(3);
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
              pdf.save('Transaction Report.pdf');
            },
            margins
          );
        }
      );
  }
}
