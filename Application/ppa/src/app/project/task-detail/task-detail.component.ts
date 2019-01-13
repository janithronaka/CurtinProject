import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../task.model';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ProjectComponent } from '../project.component';
import { ProjectModel } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  newTask: TaskModel;
  action: String;
  projectId: String;
  project: ProjectModel;
  tasks: TaskModel[];

  taskStates: String[] = ['Initialized', 'Approved', 'Started', 'Completed', 'Cancelled'];

  constructor(private projectService: ProjectService, private taskService: TaskService, private router: Router, private route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.action = 'Create';
    this.newTask = {
      taskId: null,
      name: '',
      description: '',
      budget: null,
      completed: false,
      createdDate: null,
      projectId: ''
    }
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.projectId = paramMap.get('projectId');
        this.projectService.getProject(this.projectId).subscribe((data) => {
          this.project = data;
        })
      }
      if (paramMap.has('taskId')) {
        var taskId = paramMap.get('taskId');
        this.action = 'Update';
        this.taskService.getTask(taskId).subscribe((data: any) => {
          this.newTask = data;
        });
      }
    });
  }

  submitTask(form: NgForm) {
    this.taskService.getTasks(this.projectId).subscribe((data) => {
      var taskBudgetTotal = parseInt(form.value.budget);
      if (data) {
        data.forEach((task) => {
          if (form.value.taskId) {
            if (form.value.taskId === task.taskId) {
              return;
            }
          }
          taskBudgetTotal += task.budget;
        })
      }
      if (taskBudgetTotal > this.project.budget) {
        this.openSnackBar(`Total budget of tasks exceed project budget. Please check the budget values`);
        return;
      }
      if (this.action == 'Create') {
        this.createTask(form);
      }
      else if (this.action == 'Update') {
        this.updateTask(form);
      }
    })
  }

  createTask(form: NgForm) {
    form.value.projectId = this.projectId;
    this.taskService.createTask(form.value).subscribe((data: any) => {
      this.openSnackBar(`Task ${data.taskId} created`);
      this.router.navigate([`/projects/${this.projectId}`]);
    });
  }
  updateTask(form: NgForm) {
    this.taskService.updateTask(form.value).subscribe((data: any) => {
      this.openSnackBar(`Task ${form.value.taskId} updated`);
      this.router.navigate([`/projects/${this.projectId}`]);
    });
  }

  checkBudget(taskId, budget) {

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000, // time duration the snackbar will be displayed
    });
  }

}
