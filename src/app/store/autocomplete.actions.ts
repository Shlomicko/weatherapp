import {ActionNames} from "./action-names";
import {CityLocation} from "../models/city-location";

export class GetAutocompleteAction {
  readonly type = ActionNames.GET_AUTOCOMPLETE;

  constructor(public payload: string) {
  }
}
export class AutocompleteSuccessAction {
  readonly type = ActionNames.GET_AUTOCOMPLETE_SUCCESS;

  constructor(public payload: CityLocation[]) {
  }
}

export type AutocompleteActions = GetAutocompleteAction | AutocompleteSuccessAction;

