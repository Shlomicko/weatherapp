import {CityLocation} from "../models/city-location";
import {CurrentConditionsData} from "../models/current-conditions-data";
import {ForecastData} from "../models/forecast-data";
import {createSelector} from "@ngrx/store";
import {selectWeather} from "../app.state";

export interface WeatherState {
  readonly locationKey?: string;
  readonly selectedCity?: CityLocation;
  readonly currentConditionsData?: CurrentConditionsData;
  readonly forecastData?: ForecastData;
}

export const weatherSelector = createSelector(
  selectWeather,
  (state: WeatherState) => state
);

