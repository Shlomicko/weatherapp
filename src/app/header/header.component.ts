import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {getIsSaveLocationKeySelector, temperatureUnitSelector} from '../store/configuration.state';
import * as TemperatureUnitActions from '../store/configurations.actions';
import {MatDialog} from "@angular/material/dialog";
import {SetApiDialogComponent} from "../set-api-dialog/set-api-dialog.component";
import {WeatherService} from "../services/weather.service";
import {ToggleDarkModeAction, ToggleSetSaveLastForecastAction} from '../store/configurations.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<AppState>, private weatherService: WeatherService, public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(SetApiDialogComponent, {width: '350px', data: {key: ''}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.weatherService.setApiKey(result);
    });
  }

}
