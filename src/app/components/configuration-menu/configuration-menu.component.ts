import {Component, OnInit} from '@angular/core';
import * as TemperatureUnitActions from "../../store/configurations.actions";
import {SetAsHomePageAction, ToggleDarkModeAction} from "../../store/configurations.actions";
import {ToggleSetSaveLastForecastAction} from "../../store/configurations.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {getHomePageSelector, getIsSaveLocationKeySelector, temperatureUnitSelector} from "../../store/configuration.state";
import {weatherSelector, WeatherState} from "../../store/weather.state";
import {filter, skip} from "rxjs/operators";

@Component({
  selector: 'app-configuration-menu',
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.css']
})
export class ConfigurationMenuComponent implements OnInit {

  public useCelsius: boolean;
  public isDarkMode: boolean;
  public isSaveLastForecast: boolean;
  public cityName: string;
  public isHomepageSet: boolean = false;
  private locationKey: string;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.store.select(temperatureUnitSelector)
      .subscribe((useCelsius) => {
        this.useCelsius = useCelsius;
      });

    this.store.select(getIsSaveLocationKeySelector)
      .subscribe((save) => {
        this.isSaveLastForecast = save;
      });

    this.store.select(weatherSelector)
      .pipe(skip(1))
      .subscribe((state: WeatherState) => {
          this.cityName = state.selectedCity?.LocalizedName;
          this.locationKey = state.selectedCity?.Key;
        }
      );

    this.store.select(getHomePageSelector)
      .pipe(filter((key) => key !== 'unknown' && key !== 'undefined'))
      .subscribe((key: string) => {
          this.isHomepageSet = key?.length > 0;
        }
      );


  }


  public onTemperaturesUnitToggle(): void {
    this.store.dispatch(new TemperatureUnitActions.ToggleTemperatureUnitsAction());
  }

  public onDarkModeToggle(): void {
    this.store.dispatch(new ToggleDarkModeAction());
  }

  public onSetSaveLastForecast(): void {
    this.store.dispatch(new ToggleSetSaveLastForecastAction(true));
  }

  public onSetAsHomePage(event): void {
    const isSet: boolean = event.checked;
    this.store.dispatch(new SetAsHomePageAction(isSet ? this.locationKey : ''));
  }

}
