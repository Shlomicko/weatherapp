import {Injectable} from '@angular/core';
import {CityLocation} from '../models/city-location';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ForecastData} from '../models/forecast-data';
import {ForecastPeriod} from '../models/forecast-period.enum';
import {CurrentConditionsData} from '../models/current-conditions-data';
import {TemperatureSymbol} from '../models/temperature-symbol.enum';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_KEY: string = 'S4iyCmDFGYPJsRETgZDoL0lhJWIOGjkF';
  private readonly API_URL: string = 'https://dataservice.accuweather.com/';

  constructor(private _http: HttpClient) {
  }

  public setApiKey(key: string): void {
    this.API_KEY = key;
  }

  public getAutoCompleteResults(q: string): Observable<CityLocation[]> {
     return this._http.get<CityLocation[]>(`${this.API_URL}locations/v1/cities/autocomplete?apikey=${this.API_KEY}&q=${q}`)
       .pipe(map(data => data ? data : []));
  }

  public getNextDaysForecastForLocation(locationKey: string,
                                        isCelsius: boolean = true,
                                        forecastDaysRange: ForecastPeriod = ForecastPeriod.FIVE_DAYS): Observable<ForecastData> {
    let daysRange;
    switch (forecastDaysRange) {
      case ForecastPeriod.ONE_DAY:
        daysRange = '1day';
        break;
      case ForecastPeriod.FIVE_DAYS:
        daysRange = '5day';
        break;
      case ForecastPeriod.TEN_DAYS:
        daysRange = '10day';
        break;
      case ForecastPeriod.FIFTEEN_DAYS:
        daysRange = '15day';
        break;
      default:
        daysRange = '5day';
    }
    return this._http.get<ForecastData>(
      `${this.API_URL}forecasts/v1/daily/${daysRange}/${locationKey}?apikey=${this.API_KEY}&metric=${isCelsius}`)
      .pipe(map(res => {
        const forecastData: ForecastData = res;
        res.temperatureSymbol = isCelsius ? TemperatureSymbol.CELSIUS_SYMBOL : TemperatureSymbol.FAHRENHEIT_SYMBOL;
        return forecastData;
      }));
  }

  public getCurrentDayForecast(locationKey: string): Observable<CurrentConditionsData> {
    return this._http.get<CurrentConditionsData>(
      `${this.API_URL}currentconditions/v1/${locationKey}?apikey=${this.API_KEY}&details=true`)
      .pipe(map(res => {
        const currentConditionsData: CurrentConditionsData = res[0];
        currentConditionsData.LocationKey = locationKey;

        return currentConditionsData;
      }));
  }

  public getLocationByLocationKey(locationKey: string): Observable<CityLocation> {
    return this._http.get<CityLocation>(`${this.API_URL}locations/v1/${locationKey}?apikey=${this.API_KEY}`);
  }

  public getCityByCoords(lat: number, lon: number): Observable<CityLocation> {
    return this._http.get<CityLocation>(`${this.API_URL}locations/v1/cities/geoposition/search?apikey=${this.API_KEY}&q=${lat},${lon}`);
  }
}

