import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ActionNames} from "./action-names";
import {map, mergeMap} from "rxjs/operators";
import {StorageService} from "../services/storage.service";
import {
  GetHomePageAction,
  GetLocationKeyFromLocalStorageAction,
  SaveLocationKeyToLocalStorageAction,
  SetAsHomePageAction,
  ToggleSetSaveLastForecastAction,
  UpdateHomePageAction,
  UpdateIsSaveLastForecastAction,
  UpdateLocationKeyAction
} from "./configurations.actions";

@Injectable()
export class ConfigurationEffects {

  public saveLocationKey = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionNames.SAVE_LOCATION_KEY_IN_LOCAL_STORAGE),
      mergeMap((action: SaveLocationKeyToLocalStorageAction) => this.storageService.saveLocationKey(action.locationKey)
        .pipe(map(key => new UpdateLocationKeyAction(key))),
      )
    )
  );

  public getLocationKey = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionNames.GET_LOCATION_KEY_FROM_LOCAL_STORAGE),
      mergeMap((action: GetLocationKeyFromLocalStorageAction) => this.storageService.getSavedLocationKey()
        .pipe(map(key => new UpdateLocationKeyAction(key))),
      )
    )
  );

  public isSaveLastForecast = createEffect(() => this.actions$.pipe(
    ofType(ActionNames.TOGGLE_SET_SAVE_LAST_FORECAST),
    mergeMap((action: ToggleSetSaveLastForecastAction) => this.storageService.setSaveLastForecast(action.save)
      .pipe(map(save => new UpdateIsSaveLastForecastAction(save))))
  ));

  public setAsHomePage = createEffect(() => this.actions$.pipe(
    ofType(ActionNames.SET_AS_HOME_PAGE),
    mergeMap((action: SetAsHomePageAction) => this.storageService.setHomePage(action.locationKey).pipe(
      map(key => new UpdateHomePageAction(key))
    ))
  ));

public getAsHomePage = createEffect(() => this.actions$.pipe(
    ofType(ActionNames.GET_HOME_PAGE),
    mergeMap((action: GetHomePageAction) => this.storageService.getHomePage().pipe(
      map(key => new UpdateHomePageAction(key))
    ))
  ));

  constructor(private actions$: Actions, private storageService: StorageService) {
  }

}

