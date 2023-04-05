import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  public widthSlider!: number;
  public anchuraSlider!: number;
  constructor(){

  }

  ngOnInit(): void {
   
  }

  cargarSlider(){
      this.anchuraSlider = this.widthSlider
  }

  getAutor(event: any){
    console.log(event)
  }

}
