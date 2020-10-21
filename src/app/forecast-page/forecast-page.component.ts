import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {CityLocation} from '../models/city-location';
import {Subject} from 'rxjs';
import {ForecastData} from '../models/forecast-data';
import {CurrentConditionsData} from '../models/current-conditions-data';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {getHomePageSelector, getSavedLocationKeySelector, temperatureUnitSelector} from '../store/configuration.state';
import {ToggleFavoritesAction} from '../store/favorite.actions';
import {favoritesSelector} from '../store/favorite.state';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {FavoriteData} from '../models/favorite-data';
import {filter, takeUntil} from 'rxjs/operators';
import {GeolocationService} from "../services/geolocation.service";
import {darkModeSelector} from '../store/configuration.state';
import {FetchWeatherDataAction} from "../store/weather.actions";
import {weatherSelector, WeatherState} from "../store/weather.state";
import {GetHomePageAction, GetLocationKeyFromLocalStorageAction} from "../store/configurations.actions";


@Component({
  selector: 'app-home-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.css']
})
export class ForecastPageComponent implements OnInit, AfterViewInit, OnDestroy {

  public selectedCity: CityLocation;
  public forecastData: ForecastData = null;
  public currentConditionsData: CurrentConditionsData;
  public favorites: FavoriteData[];
  public useCelsius: boolean;
  public isFavorite: boolean;
  public isDarkMode: boolean = false;
  public isFavoriteColor: string = '';

  private disposeAll$: Subject<void> = new Subject<void>();
  private latitude: number;
  private longitude: number;
  private hasGeolocationApprove: boolean = false;
  private lastVisitedLocationKey: string = null;
  private homePageLocationKey: string;


  constructor(private weatherService: WeatherService,
              private geolocationService: GeolocationService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.store.select(temperatureUnitSelector).subscribe((useCelsius) => {
      this.useCelsius = useCelsius;
    });

    this.store.select(favoritesSelector).pipe(takeUntil(this.disposeAll$))
      .subscribe(favoritesState => {
        const favorites: FavoriteData[] = favoritesState.favorites;
        this.favorites = favorites;
        this.isFavorite = this.checkIsFavorite(favorites);
        this.setFavoriteButtonColor();
      });

    this.store.select(darkModeSelector).subscribe((darkMode: boolean) => {
      this.isDarkMode = darkMode;
    });

    this.store.select(weatherSelector).subscribe((state: WeatherState) => {
        this.selectedCity = state.selectedCity;
        this.currentConditionsData = state.currentConditionsData;
        this.isFavorite = this.checkIsFavorite(this.favorites);
        this.forecastData = state.forecastData;
        this.setFavoriteButtonColor();
      },
      error => {
        this.snackBar.open(`Sorry, could not retrieve weather detail`, 'Ok',
          {duration: 5000});
      }
    );

    this.store.select(getHomePageSelector)
      .pipe(filter((key) => key !== 'unknown'))
      .subscribe((homePageKey: string) => {
        this.homePageLocationKey = homePageKey;
        if (!this.homePageLocationKey) {
          this.store.dispatch(new GetLocationKeyFromLocalStorageAction());
        } else {
          this.getLocationForecast(this.homePageLocationKey);
        }
      });

    this.store.select(getSavedLocationKeySelector)
      .pipe(filter((key) => key !== 'unknown'))
      .subscribe((key: string) => {
        this.lastVisitedLocationKey = key;
        // If we have a location key in storage AND have no location key in url (i.e no id in params)
        if (this.lastVisitedLocationKey && !this.route.snapshot.params.id) {
          this.router.navigateByUrl(`/forecast/${this.lastVisitedLocationKey}`);
        } else {
          if (!this.route.snapshot.params.id) {
            this.geolocationService.getCurrentPosition().then(position => {
              if (position) {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.weatherService.getCityByCoords(this.latitude, this.longitude)
                  .subscribe(location => {
                    this.router.navigateByUrl(`/forecast/${location.Key}`);
                  });
              }
              this.hasGeolocationApprove = position !== null;
            }).catch(errorMessage => {
              this.snackBar.open("Could not retrieve you location", "Dismiss", {duration: 4000});
            });
          }
        }
      });
  }

  async ngAfterViewInit() {
    this.store.dispatch(new GetHomePageAction());
    this.route.params.pipe(takeUntil(this.disposeAll$)).subscribe(params => {
      const locationKey: string = params['id'];
      if (locationKey) {
        this.getLocationForecast(locationKey);
      }
    });
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

  private getLocationForecast(locationKey: string): void {
    this.store.dispatch(new FetchWeatherDataAction(locationKey));
  }

  private checkIsFavorite(favorites: FavoriteData[]): boolean {
    if (!this.currentConditionsData) {
      return false;
    }
    return favorites?.some(item => item.LocationKey === this.currentConditionsData.LocationKey);
  }

  private setFavoriteButtonColor() {
    this.isFavoriteColor = this.isFavorite ? 'warn' : 'grey';
  }

  private navigateToForeCast(to: string): void {

  }

  ngOnDestroy(): void {
    this.disposeAll$.next();
    this.disposeAll$.complete();
  }

}
