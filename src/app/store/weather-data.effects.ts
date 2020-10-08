import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WeatherService} from "../services/weather.service";
import {ActionNames} from "./action-names";
import {map, mergeMap, withLatestFrom} from "rxjs/operators";
import {selectFetchData} from "../app.state";
import {Store} from "@ngrx/store";
import {SuccessfulWeatherDataFetchAction} from "./weather.actions";
import {zip} from "rxjs";

@Injectable()
export class WeatherDataEffects {
  public fetchDataForCurrentUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionNames.FETCH_DATA),
      withLatestFrom(this.store.select(selectFetchData)),
      mergeMap(([action, {locationKey, useCelsius}]) => {
        return zip(this.weatherService.getLocationByLocationKey("215854"),
          this.weatherService.getCurrentDayForecast("215854"),
          this.weatherService.getNextDaysForecastForLocation("215854", true)).pipe(
          map(([cityLocation, currentConditionsData, forecastData]) => {
            return new SuccessfulWeatherDataFetchAction({
              currentConditionsData,
              forecastData,
              selectedCity: cityLocation
            });
          })
        );
      })
    )
  );

  constructor(private actions$: Actions,
              private weatherService: WeatherService,
              private store: Store) {
  }
}
