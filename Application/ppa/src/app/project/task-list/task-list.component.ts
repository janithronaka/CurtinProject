import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskModel } from '../task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ProjectModel } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  private tasks: TaskModel[] = [];
  private displayedColumns: string[] = ['taskId', 'name', 'description', 'budget', 'completed', 'actionsColumn'];

  projectId: string;
  project: ProjectModel;

  dataSource: MatTableDataSource<TaskModel>;

  globalFilter = '';
  taskIdFilter = new FormControl();
  nameFilter = new FormControl();
  completedFilter = new FormControl();

  filteredValues = {
    taskId: '',
    name: '',
    completed: false
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userFullName: string;

  constructor(private taskService: TaskService, private projectService: ProjectService, private route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.userFullName = sessionStorage.getItem('name');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.projectId = paramMap.get('projectId');
        
        this.projectService.getProject(this.projectId).subscribe((data) => {
          this.project = data;
        })

        this.taskService.getTasks(this.projectId).subscribe((data: any) => {
          this.tasks = data;
          this.dataSource = new MatTableDataSource(this.tasks);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.taskIdFilter.valueChanges.subscribe((taskIdFilterValue) => {
            this.filteredValues['taskId'] = taskIdFilterValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
          });
      
          this.nameFilter.valueChanges.subscribe((nameValue) => {
            this.filteredValues['name'] = nameValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
          });
    
          this.completedFilter.valueChanges.subscribe((completedValue) => {
            this.filteredValues['completed'] = completedValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
          });
        });
      }
    });
  }

  deleteTask(taskObj) {
    var message: string;
    if(this.project.status == 'COMPLETED' || this.project.status == 'COMPLETED') {
      message = "Cannot delete tasks of " + this.project.status + " projects"
      this.openSnackBar(message);
      return;
    }
    this.taskService.removeTask(taskObj).subscribe((data) => {
      this.tasks = [];
      this.openSnackBar(`Task ${taskObj.taskId} deleted`);
      this.taskService.getTasks(this.projectId).subscribe((tasks) => {
        this.tasks = tasks;
        this.dataSource = new MatTableDataSource(this.tasks);
      })
    })
  }

  applyFilter(filterValue: string) {
    this.globalFilter = filterValue;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: TaskModel, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.taskId.toString().toLocaleLowerCase().trim().indexOf(searchString.projectId.toLowerCase()) !== -1 &&
        data.name.toString().trim().indexOf(searchString.name) !== -1 &&
        data.completed.toString().trim().indexOf(searchString.completed) !== -1
    }
    console.log(myFilterPredicate);
    return myFilterPredicate;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000, // time duration the snackbar will be displayed
    });
  }

}
