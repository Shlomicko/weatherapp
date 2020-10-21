import * as Configurations from './configurations.actions';
import {ConfigurationState} from './configuration.state';
import {ActionNames} from "./action-names";

export const initialState: ConfigurationState = {
  useCelsius: true,
  darkMode: false,
  homePageLocationKey: 'unknown',
  savedLocationKey: 'unknown',
  isSaveLastLocationKey: false
};

export function configurationReducer(state: ConfigurationState = initialState,
                                     action: Configurations.ConfigActions): ConfigurationState {
  switch (action.type) {
    case ActionNames.TOGGLE_TEMPERATURE_UNITS:
      return {...state, useCelsius: !state.useCelsius};
    case ActionNames.TOGGLE_DARK_MODE:
      return {...state, darkMode: !state.darkMode};
    case ActionNames.TOGGLE_SET_SAVE_LAST_FORECAST:
      return {...state, isSaveLastLocationKey: !state.isSaveLastLocationKey};
    case ActionNames.UPDATE_LOCATION_KEY_IN_STATE:
      return {...state, savedLocationKey: action.locationKey};
    case ActionNames.SET_AS_HOME_PAGE:
      return {...state, homePageLocationKey: action.locationKey};
    case ActionNames.UPDATE_HOME_PAGE_IN_STATE:
      return {...state, homePageLocationKey: action.locationKey};
    default:
      return state;
  }
}



