import {ConfigurationState} from './store/configuration.state';
import {FavoriteState} from './store/favorite.state';

export interface AppState {
  readonly configuration: ConfigurationState;
  readonly favorites: FavoriteState;
}

export const selectConfiguration = (state: AppState) => state.configuration;
export const selectFavorites = (state: AppState) => state.favorites;

