import {WeatherState} from "./weather.state";
import {SuccessfulWeatherDataFetchAction} from "./weather.actions";
import {ActionNames} from "./action-names";

export const initialState: Partial<WeatherState> = {
  selectedCity: null,
  forecastData: null,
  currentConditionsData: null,
};

export function weatherReducer(state: Partial<WeatherState> = initialState,
                               action: SuccessfulWeatherDataFetchAction): Partial<WeatherState> {
  if (action.type === ActionNames.FETCH_SUCCESS) {
    return {
      ...state,
      selectedCity: action.payload.selectedCity,
      forecastData: action.payload.forecastData,
      currentConditionsData: action.payload.currentConditionsData
    };
  }
  return state;
}

