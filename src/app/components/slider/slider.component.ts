import { Component,OnInit, Input,Output,EventEmitter} from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { global } from 'src/app/services/global';
declare var $:any
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers:[ProjectService]
})
export class SliderComponent implements OnInit{
  public projects: Project[] = [];
  public url:string | undefined;
  @Input()
  anchura!: number;
  @Output() getAutor = new EventEmitter
  public autor:any

  constructor(
    private _projectService: ProjectService
  ){
    this.url = global.url
    this.autor = {
      nombre:"Osvaldo Mella",
      email:"osv.mella96@gmail.com"
    }
  }

  ngOnInit(): void {
    this.getProjects();
  }
  
  lanzar(event: any){
    this.getAutor.emit(this.autor)
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        this.projects = response.project
        console.log(response);
        setTimeout(() => {
          $('.bxslider').bxSlider({
            mode: 'fade',
            slideMargin:10,
            captions: true,
            slideWidth: 600
          });
        }, 0);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
