import * as Configurations from './configurations.actions';
import {ConfigurationState} from './configuration.state';
import {ActionNames} from "./action-names";

export const initialState: ConfigurationState = {
  useCelsius: true,
  darkMode: false
};

export function configurationReducer(state: ConfigurationState = initialState,
                                     action: Configurations.ConfigActions): ConfigurationState {
  switch (action.type) {
    case ActionNames.TOGGLE_TEMPERATURE_UNITS:
      return {...state, useCelsius: !state.useCelsius};
    case ActionNames.TOGGLE_DARK_MODE:
      return {...state, darkMode: !state.darkMode};
    default:
      return state;
  }
};



