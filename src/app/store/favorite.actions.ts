import {Action} from '@ngrx/store';
import {FavoriteData} from '../models/favorite-data';

export enum FavoriteActionType {
  TOGGLE_FAVORITES = "[Favorites] Toggle",
}

export class ToggleFavoritesAction implements Action {
  readonly type = FavoriteActionType.TOGGLE_FAVORITES;
  constructor(public payload: FavoriteData) {}
}

export type FavoriteActions = ToggleFavoritesAction;
