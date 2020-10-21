import {WeatherState} from "./weather.state";
import {WeatherDataActions} from "./weather.actions";
import {ActionNames} from "./action-names";

export const initialState: Partial<WeatherState> = {
  selectedCity: null,
  forecastData: null,
  currentConditionsData: null,
};

export function weatherReducer(state: Partial<WeatherState> = initialState,
                               action: WeatherDataActions): Partial<WeatherState> {
  switch (action.type) {
    case ActionNames.WEATHER_DATA_FETCH_SUCCESS:
      return {
        ...state,
        selectedCity: action.payload.selectedCity,
        forecastData: action.payload.forecastData,
        currentConditionsData: action.payload.currentConditionsData
      };
    case ActionNames.NEW_LOCATION_SELECTED:
      return {...state, locationKey: action.locationKey};
    default:
      return state;
  }
}

