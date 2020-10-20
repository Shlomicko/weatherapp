import {CityLocation} from "../models/city-location";
import {createSelector} from "@ngrx/store";
import {selectAutocompleteResults} from "../app.state";

export interface AutocompleteState {
  readonly citiesList: CityLocation[];
}

export const autoCompleteResultsSelector = createSelector(
  selectAutocompleteResults,
  (state: AutocompleteState) => state ? state.citiesList : []
);
