import { SearchgifsResponse, Gif } from './../../interface/gifs.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _historial:string[] = [];
  private apiKey: string = 'hMw216dCcTQAJU35N4ieu4yVyzzm5z9T';
  public resultados : Gif[] = [];
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';

  get historial() : string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('Gifs')) {
      this._historial = JSON.parse(localStorage.getItem('Gifs')!);
    }
    if (localStorage.getItem('Resultados')){
      this.resultados = JSON.parse(localStorage.getItem('Resultados')!);
    }
  }

  buscarGifs( query:string) : void {
    query = query.trim().toLocaleLowerCase();
    if( !this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('Gifs', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)

    this.http.get <SearchgifsResponse> (`${this.servicioUrl}/search`, { params: params})
      .subscribe( (response : any) => {
        this.resultados = response.data;
        localStorage.setItem('Resultados', JSON.stringify(this.resultados));
      })
  }
}
