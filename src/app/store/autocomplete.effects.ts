import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WeatherService} from "../services/weather.service";
import {Store} from "@ngrx/store";
import {ActionNames} from "./action-names";
import {map, mergeMap} from "rxjs/operators";
import {AutocompleteSuccessAction, GetAutocompleteAction} from "./autocomplete.actions";


@Injectable()
export class AutocompleteEffects {

  public getAutocompleteQuery = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionNames.GET_AUTOCOMPLETE),
      mergeMap((action: GetAutocompleteAction) => this.weatherService.getAutoCompleteResults(action.payload)
        .pipe(
          map(data => new AutocompleteSuccessAction(data ? data : [])),
      )),
    )
  );

  constructor(private actions$: Actions,
              private weatherService: WeatherService) {
  }
}
