import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[ProjectService,UploadService]
})
export class CreateComponent implements OnInit{
  public title:string;
  public project:Project;
  public status:string | undefined;
  public filesToUpload: Array<File> = [];

  constructor(
    private _projectService:ProjectService,
    private _uploadService:UploadService
  ){
    this.title = "Send to mongoDB"
    this.project = new Project('','','','',2019,'','')
  }

  ngOnInit(): void {
    
  }

  onSubmit(form: any){
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      response =>{
        if(response.project){
          this._uploadService.makeFileRequest(global.url+'upload-image/'+response.project._id,[],this.filesToUpload,'image')
          .then((result:any) =>{  
            this.status="success";  
            setTimeout(() => {
              window.location.href='http://localhost:4200/projects'; // Cambia "https://tu-url.com" por la URL a la que quieres redirigir al usuario.
            }, 2000);
           })
         
        }else{
          this.status="false";
        }
      },
      error =>{console.log(<any>Error)}
    )
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
