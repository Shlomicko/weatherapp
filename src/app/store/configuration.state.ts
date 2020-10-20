import {createSelector} from '@ngrx/store';
import {selectConfiguration} from '../app.state';

export interface ConfigurationState {
  useCelsius: boolean;
  darkMode: boolean;
  defaultForecast: string;
  isSaveLastLocationKey: boolean;
  savedLocationKey: string;
}

export const temperatureUnitSelector = createSelector(
  selectConfiguration,
  (state: ConfigurationState) => state.useCelsius
);

export const darkModeSelector = createSelector(
  selectConfiguration,
  (state: ConfigurationState) => state.darkMode
);

export const getSavedLocationKeySelector = createSelector(
  selectConfiguration,
  (state: ConfigurationState) => state.savedLocationKey
);
export const getIsSaveLocationKeySelector = createSelector(
  selectConfiguration,
  (state: ConfigurationState) => state.isSaveLastLocationKey
);

