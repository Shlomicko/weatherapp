import {createSelector} from '@ngrx/store';
import {selectFavorites} from '../app.state';
import {FavoriteData} from '../models/favorite-data';

export interface FavoriteState {
  favorites: FavoriteData[];
}

export const favoritesSelector = createSelector(
  selectFavorites,
  (state: FavoriteState) => state.favorites
);

