import {Action} from '@ngrx/store';
import {ActionNames} from "./action-names";

export class ToggleTemperatureUnitsAction implements  Action {
  readonly type = ActionNames.TOGGLE_TEMPERATURE_UNITS;
  constructor() {
  }
}

export class ToggleDarkModeAction implements  Action {
  readonly type = ActionNames.TOGGLE_DARK_MODE;
}

export type ConfigActions = ToggleTemperatureUnitsAction | ToggleDarkModeAction;
