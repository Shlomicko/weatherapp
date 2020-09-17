import {FavoriteState} from './favorite.state';
import {FavoriteActions, FavoriteActionType} from './favorite.actions';
import {FavoriteData} from '../models/favorite-data';

export const initialState: FavoriteState = {
  favorites: []
};

export function favoritesReducer(state: FavoriteState = initialState, action: FavoriteActions): FavoriteState {
  switch (action.type) {
    case FavoriteActionType.TOGGLE_FAVORITES:
      const contains: boolean = state.favorites.some(item => item.LocationKey === action.payload.LocationKey);
      let newFavorites: FavoriteData[];
      if (!contains){
        newFavorites = [...state.favorites, action.payload];
      }else {
        newFavorites = state.favorites.filter(item => item.LocationKey !== action.payload.LocationKey);
      }
      console.log('favoritesReducer', newFavorites);
      return {...state, favorites: newFavorites};
    default:
      return state;
  }
}
