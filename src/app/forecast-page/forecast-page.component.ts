import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {CityLocation} from '../models/city-location';
import {Subject, zip} from 'rxjs';
import {ForecastData} from '../models/forecast-data';
import {CurrentConditionsData} from '../models/current-conditions-data';
import {Store} from '@ngrx/store';
import {AppState, selectWeather} from '../app.state';
import {temperatureUnitSelector} from '../store/configuration.state';
import {ToggleFavoritesAction} from '../store/favorite.actions';
import {favoritesSelector} from '../store/favorite.state';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {FavoriteData} from '../models/favorite-data';
import {takeUntil} from 'rxjs/operators';
import {GeolocationService} from "../services/geolocation.service";
import {darkModeSelector} from '../store/configuration.state';
import {FetchWeatherDataAction} from "../store/weather.actions";
import {weatherSelector, WeatherState} from "../store/weather.state";


@Component({
  selector: 'app-home-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.css']
})
export class ForecastPageComponent implements AfterViewInit, OnDestroy {

  public selectedCity: CityLocation;
  public forecastData: ForecastData = null;
  public currentConditionsData: CurrentConditionsData;
  public favorites: FavoriteData[];
  public useCelsius: boolean;
  public isFavorite: boolean;
  public isDarkMode: boolean = false;
  public isFavoriteColor: string = '';

  private _dispose$: Subject<void> = new Subject<void>();
  private _latitude: number;
  private _longitude: number;
  private _hasGeolocationApprove: boolean = false;


  constructor(private _weatherService: WeatherService,
              private _locationService: GeolocationService,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private _snackBar: MatSnackBar) {

    store.select(temperatureUnitSelector).subscribe((useCelsius) => {
      console.log('temperatureUnitSelector', useCelsius);
      this.useCelsius = useCelsius;
    });
    store.select(favoritesSelector).subscribe(favorites => {
      this.favorites = favorites;
      this.isFavorite = this.checkIsFavorite(favorites);
      this.setFavoriteButtonColor();
    });

    store.select(darkModeSelector).subscribe((darkMode: boolean) => {
      this.isDarkMode = darkMode;
    });

    store.select(weatherSelector).subscribe((state: WeatherState) => {
      this.selectedCity = state.selectedCity;
      this.currentConditionsData = state.currentConditionsData;
      this.isFavorite = this.checkIsFavorite(this.favorites);
      this.forecastData = state.forecastData;
      this.setFavoriteButtonColor();
    });

  }


  async ngAfterViewInit() {
    this.store.dispatch(new FetchWeatherDataAction());
    /*await this._locationService.getCurrentPosition().then(position => {
      this._latitude = position.coords.latitude;
      this._longitude = position.coords.longitude;
      this._hasGeolocationApprove = true;
      console.log("Coords:", position.coords);
    }).catch(errorMessage => {
      this._snackBar.open("Could not retrieve you location", "Dismiss", {duration: 4000});
    });

    this.route.params.pipe(takeUntil(this._dispose$)).subscribe(params => {
      const locationKey: string = params['id'];
      console.log('ngAfterViewInit', locationKey);
      if (locationKey) {
        this.getLocationForecast(locationKey);
      } else if (this._hasGeolocationApprove) {
        this._weatherService.getCityByCoords(this._latitude, this._longitude)
          .subscribe(location => {
            this.getLocationForecast((location.Key));
          });
      }
    });*/
  }

  public onFavoriteToggle(): void {
    const {Key, LocalizedName: cityName, Country: {LocalizedName: countryName}} = this.selectedCity;
    this.store.dispatch(new ToggleFavoritesAction({
      LocationKey: Key,
      LocationName: cityName,
      CountryName: countryName,
      WeatherText: this.currentConditionsData.WeatherText,
    }));
  }

  public onLocationItemClick(location: CityLocation): void {
    this.getLocationForecast(location.Key);
  }

  private getLocationForecast(locationKey: string): void {
    zip(this._weatherService.getLocationByLocationKey(locationKey),
      this._weatherService.getCurrentDayForecast(locationKey),
      this._weatherService.getNextDaysForecastForLocation(locationKey, this.useCelsius)).subscribe(
      ([cityInfo, currentWeather, forecastWeather]:
         [CityLocation, CurrentConditionsData, ForecastData]) => {
        this.selectedCity = cityInfo;
        this.currentConditionsData = currentWeather;
        this.isFavorite = this.checkIsFavorite(this.favorites);
        this.forecastData = forecastWeather;
        this.setFavoriteButtonColor();
      },
      error => {
        this._snackBar.open(`Sorry, could not retrieve weather detail`, 'Ok',
          {duration: 5000});
      }
    );
  }

  private checkIsFavorite(favorites: FavoriteData[]): boolean {
    if (!this.currentConditionsData) {
      return false;
    }
    return favorites.some(item => item.LocationKey === this.currentConditionsData.LocationKey);
  }

  private setFavoriteButtonColor() {
    this.isFavoriteColor = this.isFavorite ? 'warn' : 'grey';
  }

  ngOnDestroy(): void {
    this._dispose$.next();
    this._dispose$.complete();
  }

}
