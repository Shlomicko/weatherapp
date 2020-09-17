import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  public getCurrentPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        resolve(position);
      }, error => {
        reject(error.message);
      });
    });
  }

}
