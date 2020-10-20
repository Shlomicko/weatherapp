import {Action} from '@ngrx/store';
import {FavoriteData} from '../models/favorite-data';
import {ActionNames} from "./action-names";

export class ToggleFavoritesAction implements Action {
  readonly type = ActionNames.TOGGLE_FAVORITES;

  constructor(public payload: FavoriteData) {
  }
}

export class GetFavoritesFromLocalStorageAction implements Action {
  readonly type = ActionNames.GET_FAVORITES;

  constructor() {
  }
}

export class UpdateFavoritesFromLocalStorageAction implements Action {
  readonly type = ActionNames.UPDATE_FAVORITES_FROM_STORAGE;

  constructor(public payload: FavoriteData[]) {
  }
}

export type FavoriteActions = ToggleFavoritesAction | UpdateFavoritesFromLocalStorageAction | GetFavoritesFromLocalStorageAction;
