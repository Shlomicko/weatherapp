import {ConfigurationState} from './store/configuration.state';
import {FavoriteState} from './store/favorite.state';
import {WeatherState} from "./store/weather.state";
import {AutocompleteState} from "./store/autocomplete.state";

export interface AppState {
  readonly configuration: ConfigurationState;
  readonly favorites: FavoriteState;
  readonly weather: WeatherState;
  readonly autoCompleteResults: AutocompleteState;
}

export const selectConfiguration = (state: AppState) => state.configuration;
export const selectFavorites = (state: AppState) => state.favorites;
export const selectWeather = (state: AppState) => state.weather;
export const selectAutocompleteResults = (state: AppState) => state.autoCompleteResults;

