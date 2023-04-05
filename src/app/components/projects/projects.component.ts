import { Component,OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers:[ProjectService]
})
export class ProjectsComponent implements OnInit{
  public projects: Project[] = [];
  public url:string | undefined;

  constructor(
    private _projectService: ProjectService
  ){
    this.url = global.url
  }

  ngOnInit() {
    this.getProjects();
  }
  getProjects(){
  	this._projectService.getProjects().subscribe(
  		response => {
        this.projects = response.project
  			console.log(response)
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }
}
