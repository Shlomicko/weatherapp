import * as Configurations from './configurations.actions';
import {ConfigActionType} from './configurations.actions';
import {ConfigurationState} from './configuration.state';

export const initialState: ConfigurationState = {
  useCelsius: true,
  darkMode: false
};

export function configurationReducer(state: ConfigurationState = initialState,
                                     action: Configurations.ConfigActionTypes): ConfigurationState{
  switch (action.type) {
    case Configurations.ConfigActionType.TOGGLE_TEMPERATURE_UNITS:
      return  {...state, useCelsius: !state.useCelsius};
    case ConfigActionType.TOGGLE_DARK_MODE:
      return {...state, darkMode: !state.darkMode}
    default:
      return state;
  }
};



