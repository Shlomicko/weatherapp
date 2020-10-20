import {Action} from "@ngrx/store";
import {ActionNames} from "./action-names";
import {WeatherState} from "./weather.state";

export class FetchWeatherDataAction implements Action {
  readonly type = ActionNames.FETCH_WEATHER_DATA;
  constructor(public locationKey: string) {
  }
}

export class SuccessfulWeatherDataFetchAction {
  readonly type = ActionNames.WEATHER_DATA_FETCH_SUCCESS;
  constructor(public payload: Partial<WeatherState>) {
  }
}

export class SelectLocationKeyAction implements Action{
  readonly type = ActionNames.SELECT_LOCATION_KEY;
  constructor(public locationKey: string) {
  }
}

export type WeatherDataActions =
  FetchWeatherDataAction
  | SuccessfulWeatherDataFetchAction
  | SelectLocationKeyAction;
