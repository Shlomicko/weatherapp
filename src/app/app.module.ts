import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ForecastPageComponent} from './forecast-page/forecast-page.component';
import {FavoritesPageComponent} from './favorites-page/favorites-page.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {WeatherService} from './services/weather.service';
import {HttpClientModule} from '@angular/common/http';
import {LocationTypePipe} from './pipes/location-type.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreModule} from '@ngrx/store';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {configurationReducer} from './store/configuration.reducer';
import {HtmlEntityPipe} from './pipes/html-entity-pipe';
import {favoritesReducer} from './store/favorite.reducer';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AutocompleteComponent} from './autocomplete/autocomplete.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {SetApiDialogComponent} from './set-api-dialog/set-api-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {EffectsModule} from '@ngrx/effects';
import {weatherReducer} from "./store/weather.reducer";
import {WeatherDataEffects} from "./store/weather-data.effects";
import {AutocompleteEffects} from "./store/autocomplete.effects";
import {autoCompleteResultsReducer} from "./store/autocomplete.reducer";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {ConfigurationEffects} from "./store/configuration.effects";
import {MatTooltipModule} from "@angular/material/tooltip";
import { FavoriteItemComponent } from './components/favorite-item/favorite-item.component';
import { ConfigurationMenuComponent } from './components/configuration-menu/configuration-menu.component';
import {FavoriteEffects} from "./store/favorite.effects";

@NgModule({
  declarations: [
    AppComponent,
    ForecastPageComponent,
    FavoritesPageComponent,
    HeaderComponent,
    LocationTypePipe,
    HomePageComponent,
    HtmlEntityPipe,
    AutocompleteComponent,
    SetApiDialogComponent,
    FavoriteItemComponent,
    ConfigurationMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forRoot({
      configuration: configurationReducer,
      favorites: favoritesReducer,
      weather: weatherReducer,
      autoCompleteResults: autoCompleteResultsReducer
    }),
    MatSlideToggleModule,
    MatSnackBarModule,
    FontAwesomeModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatProgressBarModule,
    EffectsModule.forRoot([WeatherDataEffects, AutocompleteEffects, ConfigurationEffects, FavoriteEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatTooltipModule,
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
