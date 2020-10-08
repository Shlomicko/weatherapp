import { Pipe, PipeTransform } from '@angular/core';
import {CityLocation} from '../models/city-location';

@Pipe({
  name: 'locationType'
})
export class LocationTypePipe implements PipeTransform {

  transform(value: CityLocation[], type: string): CityLocation[] {
    if (!value || value.length === 0){
      return [];
    }
    return value.filter(city => city.Type === type);
  }

}
