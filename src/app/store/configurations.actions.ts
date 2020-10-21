import {Action} from '@ngrx/store';
import {ActionNames} from "./action-names";

export class ToggleTemperatureUnitsAction implements Action {
  readonly type = ActionNames.TOGGLE_TEMPERATURE_UNITS;
  constructor() {
  }
}

export class ToggleDarkModeAction implements Action {
  readonly type = ActionNames.TOGGLE_DARK_MODE;
}

export class ToggleSetSaveLastForecastAction implements Action {
  readonly type = ActionNames.TOGGLE_SET_SAVE_LAST_FORECAST;
  constructor(public save: boolean) {
  }
}

export class GetLocationKeyFromLocalStorageAction implements Action{
  readonly type = ActionNames.GET_LOCATION_KEY_FROM_LOCAL_STORAGE;
  constructor() {
  }
}

export class SaveLocationKeyToLocalStorageAction implements Action{
  readonly type = ActionNames.SAVE_LOCATION_KEY_IN_LOCAL_STORAGE;
  constructor(public locationKey: string) {
  }
}

export class UpdateLocationKeyAction implements Action{
  readonly type = ActionNames.UPDATE_LOCATION_KEY_IN_STATE;
  constructor(public locationKey: string) {
  }
}

export class UpdateIsSaveLastForecastAction implements Action{
  readonly type = ActionNames.UPDATE_SET_SAVE_LAST_FORECAST;
  constructor(public save: boolean) {
  }
}

export class SetAsHomePageAction implements Action{
  readonly type = ActionNames.SET_AS_HOME_PAGE;
  constructor(public locationKey: string) {
  }
}

export class GetHomePageAction implements Action{
  readonly type = ActionNames.GET_HOME_PAGE;
  constructor() {
  }
}
export class UpdateHomePageAction implements Action{
  readonly type = ActionNames.UPDATE_HOME_PAGE_IN_STATE;
  constructor(public locationKey: string) {
  }
}

export type ConfigActions =
  ToggleTemperatureUnitsAction
  | ToggleDarkModeAction
  | ToggleSetSaveLastForecastAction
  | GetLocationKeyFromLocalStorageAction
  | SaveLocationKeyToLocalStorageAction
  | UpdateLocationKeyAction
  | SetAsHomePageAction
  | UpdateHomePageAction;
