import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ActionNames} from "./action-names";
import {map, mergeMap, withLatestFrom} from "rxjs/operators";
import {GetFavoritesFromLocalStorageAction, ToggleFavoritesAction, UpdateFavoritesFromLocalStorageAction} from "./favorite.actions";
import {Injectable} from "@angular/core";
import {StorageService} from "../services/storage.service";
import {AppState} from "../app.state";
import {Store} from "@ngrx/store";
import {favoritesSelector} from "./favorite.state";

@Injectable()
export class FavoriteEffects {

  public saveFavorites = createEffect(() => this.actions$.pipe(
    ofType(ActionNames.TOGGLE_FAVORITES),
    withLatestFrom(this.store.select(favoritesSelector)),
    mergeMap(([action, {favorites}]) => {
      return this.storageService.saveFavorites(favorites).pipe(
        map((favoritesList) => new UpdateFavoritesFromLocalStorageAction(favoritesList))
      );
    }))
  );

  public getFavorites = createEffect(() => this.actions$.pipe(
    ofType(ActionNames.GET_FAVORITES),
    mergeMap((action: GetFavoritesFromLocalStorageAction) =>
      this.storageService.getFavorites().pipe(
        map((favoritesList) => new UpdateFavoritesFromLocalStorageAction(favoritesList))
      )
    ))
  );

  constructor(private actions$: Actions, private storageService: StorageService, private store: Store<AppState>) {
  }
}
