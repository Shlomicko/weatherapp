import {Action} from "@ngrx/store";
import {ActionNames} from "./action-names";
import {WeatherState} from "./weather.state";

export class FetchWeatherDataAction implements Action {
  readonly type = ActionNames.FETCH_DATA;
  constructor() {
  }
}

export class SuccessfulWeatherDataFetchAction {
  readonly type = ActionNames.FETCH_SUCCESS;
  constructor(public payload: Partial<WeatherState>) {
  }

}

export type WeatherDataActions = FetchWeatherDataAction | SuccessfulWeatherDataFetchAction;
