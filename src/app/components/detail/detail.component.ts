import { Component,OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { global } from 'src/app/services/global';
import { Router,ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ProjectService]
})

export class DetailComponent implements OnInit{
  public url:string;
  public project:Project | any;
  public confirm: boolean = false;

  constructor(
    private _projectService:ProjectService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.url = global.url;
  }

  ngOnInit(){
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this.getProject(id);
    });
  }

  getProject(id:string){
    this._projectService.getProject(id).subscribe(
      response =>{
        this.project = response.project;
      },error =>{ console.log(<any>error)}
    );
  }

  setConfirm(confirm: boolean){
    this.confirm = confirm
  }
  
  deleteProject(id: string){
  	this._projectService.deleteProject(id).subscribe(
  		response => {
  				this._router.navigate(['/projects']);
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

}
