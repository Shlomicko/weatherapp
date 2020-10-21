import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WeatherService} from "../services/weather.service";
import {ActionNames} from "./action-names";
import {map, mergeMap, withLatestFrom} from "rxjs/operators";
import {AppState, selectConfiguration} from "../app.state";
import {Store} from "@ngrx/store";
import {FetchWeatherDataAction, SelectLocationKeyAction, SuccessfulWeatherDataFetchAction} from "./weather.actions";
import {of, zip} from "rxjs";

@Injectable()
export class WeatherDataEffects {
/*
  public locationKeySelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionNames.NEW_LOCATION_SELECTED),
      mergeMap((action: SelectLocationKeyAction) => of(action.locationKey).pipe(
        map(key => new FetchWeatherDataAction(key))),
      )
    )
  );*/

  public fetchDataForCurrentUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionNames.FETCH_WEATHER_DATA),
      withLatestFrom(this.store.select(selectConfiguration)),
      mergeMap(([action, {useCelsius}]) => {
        const locationKey: string = (action as FetchWeatherDataAction).locationKey;
        return zip(this.weatherService.getLocationByLocationKey(locationKey),
          this.weatherService.getCurrentDayForecast(locationKey),
          this.weatherService.getNextDaysForecastForLocation(locationKey, useCelsius)).pipe(
          map(([cityLocation, currentConditionsData, forecastData]) => {
            return new SuccessfulWeatherDataFetchAction({
              currentConditionsData,
              forecastData,
              selectedCity: cityLocation,
            });
          })
        );
      })
    )
  );

  constructor(private actions$: Actions,
              private weatherService: WeatherService,
              private store: Store<AppState>) {
  }
}
