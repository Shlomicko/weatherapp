import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {temperatureUnitSelector} from '../store/configuration.state';
import * as TemperatureUnitActions from '../store/configurations.actions';
import {MatDialog} from "@angular/material/dialog";
import {SetApiDialogComponent} from "../set-api-dialog/set-api-dialog.component";
import {WeatherService} from "../services/weather.service";
import { ToggleDarkModeAction } from '../store/configurations.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public useCelsius: boolean;

  constructor(private store: Store<AppState>, private _weatherService: WeatherService, public dialog: MatDialog) {
    store.select(temperatureUnitSelector).subscribe((useCelsius) => {
      this.useCelsius = useCelsius;
    });
  }


  public openDialog(): void {
    const dialogRef = this.dialog.open(SetApiDialogComponent, {width: '350px', data: {key: ''}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this._weatherService.setApiKey(result);
    });
  }


  public onTemperaturesUnitToggle(): void {
    this.store.dispatch(new TemperatureUnitActions.ToggleTemperatureUnitsAction());
  }

  public onDarkModeToggle(): void {
    this.store.dispatch(new ToggleDarkModeAction());
  }
  
}
