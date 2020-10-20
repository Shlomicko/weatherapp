import { Component, OnInit } from '@angular/core';
import * as TemperatureUnitActions from "../../store/configurations.actions";
import {ToggleDarkModeAction} from "../../store/configurations.actions";
import {ToggleSetSaveLastForecastAction} from "../../store/configurations.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {getIsSaveLocationKeySelector, temperatureUnitSelector} from "../../store/configuration.state";

@Component({
  selector: 'app-configuration-menu',
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.css']
})
export class ConfigurationMenuComponent implements OnInit {

  public useCelsius: boolean;
  public isDarkMode: boolean;
  public isSaveLastForecast: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select(temperatureUnitSelector).subscribe((useCelsius) => {
      this.useCelsius = useCelsius;
    });

    this.store.select(getIsSaveLocationKeySelector).subscribe((save) => {
      this.isSaveLastForecast = save;
    });
  }


  public onTemperaturesUnitToggle(): void {
    this.store.dispatch(new TemperatureUnitActions.ToggleTemperatureUnitsAction());
  }

  public onDarkModeToggle(): void {
    this.store.dispatch(new ToggleDarkModeAction());
  }

  public onSetSaveLAstForecast(): void {
    this.store.dispatch(new ToggleSetSaveLastForecastAction(true));
  }

}
