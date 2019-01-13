import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectModel } from '../project.model';
import { ProjectService } from '../project.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ExcoService } from '../../exco-members/exco.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  private projects: ProjectModel[] = [];
  dataSource: MatTableDataSource<ProjectModel>;
  private displayedColumns: string[] = ['projectId', 'name', 'status', 'actionsColumn'];

  globalFilter = '';
  projectIdFilter = new FormControl();
  nameFilter = new FormControl();
  statusFilter = new FormControl();
  isAdmin : boolean;
  isAccountent : boolean;
  userFullName: string;

  projectStates: String[] = ['Initialized', 'Approved', 'Started', 'Completed', 'Cancelled'];

  filteredValues = {
    projectId: '',
    name: '',
    status: ''
  };



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private excoService: ExcoService, private projectService: ProjectService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe((data : any) => {
      this.projects = data;
      this.dataSource = new MatTableDataSource(this.projects);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.projectIdFilter.valueChanges.subscribe((projectIdFilterValue) => {
        this.filteredValues['projectId'] = projectIdFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
  
      this.nameFilter.valueChanges.subscribe((nameValue) => {
        this.filteredValues['name'] = nameValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });

      this.statusFilter.valueChanges.subscribe((statusValue) => {
        this.filteredValues['status'] = statusValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
      this.excoService.getByMemId(sessionStorage.getItem('id')).subscribe((data: any) => {
        if (data.position == 'Admin') {
          this.isAdmin = true;
        } else if (data.position == 'Accountent') {
          this.isAccountent = true;
          console.log(this.isAccountent);
        }
       });

      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
  }

  applyFilter(filterValue: string) {
    this.globalFilter = filterValue;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: ProjectModel, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.projectId.toString().toLocaleLowerCase().trim().indexOf(searchString.projectId.toLowerCase()) !== -1 &&
        data.name.toString().trim().indexOf(searchString.name) !== -1 &&
        data.status.toString().trim().indexOf(searchString.status) !== -1;
    }
    return myFilterPredicate;
  }

}
