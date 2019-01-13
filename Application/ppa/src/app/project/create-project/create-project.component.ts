import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../project.model';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TaskModel } from '../task.model';
import { TaskService } from '../task.service';
import { ExcoService } from '../../exco-members/exco.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  newProject: ProjectModel;
  action: String;
  tasks: TaskModel[];
  projectStates: String[] = ['Initialized', 'Approved', 'Started', 'Completed', 'Cancelled'];
  isAdmin: boolean;
  isAccountent: boolean;

  constructor(private excoService:ExcoService, private taskService: TaskService, private projectService: ProjectService, private router: Router, private route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.action = 'Create';
    this.newProject = {
      projectId: '',
      name: '',
      description: '',
      status: '',
      budget: 0,
      startingDate: null,
      tasks: null
    }
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        var projectId = paramMap.get('projectId');
        this.action = 'Update';
        this.projectService.getProject(projectId).subscribe((data: any) => {
          this.newProject = data;
        });

      }
      this.excoService.getByMemId(sessionStorage.getItem('id')).subscribe((data: any) => {
        if (data.position == 'Admin') {
          this.isAdmin = true;
        } else if (data.position == 'Accountent') {
          this.isAccountent = true;
        }
       });
    });
  }

  submitProject(form: NgForm) {
    if (this.action == 'Create') {
      this.createProject(form);
    }
    else if (this.action == 'Update') {
      this.updateProject(form);
    }
  }

  createProject(form: NgForm) {
    this.projectService.createProject(form.value).subscribe((data: any) => {
      this.openSnackBar(`Project ${data.projectId} created`);
      this.router.navigate([`/projects/${data.projectId}`]);
    });
  }

  updateProject(form: NgForm) {
    this.taskService.getTasks(this.newProject.projectId).subscribe((tasks) => {
      this.tasks = tasks;
      var projectBudget = parseInt(form.value.budget);
      var taskBudget = 0;

      if (this.tasks) {
        this.tasks.forEach((task) => {
          taskBudget += task.budget;
        })
        if (taskBudget > projectBudget) {
          this.openSnackBar(`Total budget of tasks exceed project budget. Please check the budget values`);
          return;
        }
      }

      this.projectService.updateProject(form.value).subscribe((data: any) => {
        this.openSnackBar(`Project ${this.newProject.projectId} updated`);
        this.router.navigate([`/projects/${this.newProject.projectId}`]);
      });
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000, // time duration the snackbar will be displayed
    });
  }
}
