import {AutocompleteState} from "./autocomplete.state";
import {AutocompleteSuccessAction} from "./autocomplete.actions";
import {ActionNames} from "./action-names";

export const initialState: AutocompleteState = {
  citiesList: [] = [],
};

export function autoCompleteResultsReducer(state: AutocompleteState = initialState,
                                           action: AutocompleteSuccessAction): AutocompleteState {
  if (action.type === ActionNames.GET_AUTOCOMPLETE_SUCCESS) {
    console.log('autoCompleteResultsReducer', action.type, action.payload);
    return {...state, citiesList: action.payload};
  }
  return state;
}
