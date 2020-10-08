import {Action} from '@ngrx/store';
import {FavoriteData} from '../models/favorite-data';
import {ActionNames} from "./action-names";

export class ToggleFavoritesAction implements Action {
  readonly type = ActionNames.TOGGLE_FAVORITES;
  constructor(public payload: FavoriteData) {}
}

export type FavoriteActions = ToggleFavoritesAction;
