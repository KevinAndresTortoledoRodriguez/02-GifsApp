import { GifsService } from './../services/gifs.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent{

  constructor( private gifsService:GifsService) {}

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar () {
    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs(valor)

    this.txtBuscar.nativeElement.value = '';
  }
}
