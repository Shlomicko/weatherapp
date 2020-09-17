import {Action} from '@ngrx/store';

export enum ConfigActionType {
  TOGGLE_TEMPERATURE_UNITS = '[App] Toggle Temperature units',
  TOGGLE_DARK_MODE = '[App] Toggle Dark mode',
}

export class ToggleTemperatureUnitsAction implements  Action {
  readonly type = ConfigActionType.TOGGLE_TEMPERATURE_UNITS;
}

export class ToggleDarkModeAction implements  Action {
  readonly type = ConfigActionType.TOGGLE_DARK_MODE;
}

export type ConfigActionTypes = ToggleTemperatureUnitsAction | ToggleDarkModeAction;
