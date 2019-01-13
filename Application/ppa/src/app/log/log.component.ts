import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProjectModel } from '../project/project.model';
import { LogService } from './log.service';
import { LogModel } from './log.model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {


  dataSource: MatTableDataSource<LogModel>;
  logs : LogModel[] = [];
  private displayedColumns: string[] = ['type', 'action', 'date', 'user'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getLogs().subscribe((data) => {
      this.logs = data;
      this.dataSource = new MatTableDataSource(this.logs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
