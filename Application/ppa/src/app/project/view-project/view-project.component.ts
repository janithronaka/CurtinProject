import { Component, OnInit } from '@angular/core';
import { ProjectComponent } from '../project.component';
import { ProjectModel } from '../project.model';
import { ProjectService } from '../project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  project$: Observable<ProjectModel>;
  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.projectService.getProject(params.get('projectId')))
    );
  }

}
