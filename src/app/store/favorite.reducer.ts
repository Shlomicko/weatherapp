import {FavoriteState} from './favorite.state';
import {FavoriteActions} from './favorite.actions';
import {FavoriteData} from '../models/favorite-data';
import {ActionNames} from "./action-names";

export const initialState: FavoriteState = {
  favorites: []
};

export function favoritesReducer(state: FavoriteState = initialState, action: FavoriteActions): FavoriteState {
  switch (action.type) {
    case ActionNames.TOGGLE_FAVORITES:
      const contains: boolean = state.favorites.some(item => item.LocationKey === action.payload.LocationKey);
      let newFavorites: FavoriteData[];
      if (!contains) {
        newFavorites = [...state.favorites, action.payload];
      } else {
        newFavorites = state.favorites.filter(item => item.LocationKey !== action.payload.LocationKey);
      }
      return {...state, favorites: newFavorites};
    case ActionNames.UPDATE_FAVORITES_FROM_STORAGE:
      return {...state, favorites: action.payload};
    default:
      return state;
  }
}
