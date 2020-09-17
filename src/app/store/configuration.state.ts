import {createSelector} from '@ngrx/store';
import {selectConfiguration} from '../app.state';

export interface ConfigurationState {
  useCelsius: boolean;
  darkMode: boolean;
}

export const temperatureUnitSelector = createSelector(
  selectConfiguration,
  (state: ConfigurationState) => state.useCelsius
);

export const darkModeSelector = createSelector(
  selectConfiguration,
  (state: ConfigurationState) => state.darkMode
);