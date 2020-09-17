import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ForecastPageComponent } from './forecast-page/forecast-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import {WeatherService} from './services/weather.service';
import {HttpClientModule} from '@angular/common/http';
import { LocationTypePipe } from './pipes/location-type.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HomePageComponent } from './home-page/home-page.component';
import {StoreModule} from '@ngrx/store';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {configurationReducer} from './store/configuration.reducer';
import { HtmlEntityPipe } from './pipes/html-entity-pipe';
import {favoritesReducer} from './store/favorite.reducer';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SetApiDialogComponent } from './set-api-dialog/set-api-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    ForecastPageComponent,
    FavoritesPageComponent,
    SearchBarComponent,
    HeaderComponent,
    LocationTypePipe,
    HomePageComponent,
    HtmlEntityPipe,
    AutocompleteComponent,
    SetApiDialogComponent,
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
        StoreModule.forRoot({configuration: configurationReducer, favorites: favoritesReducer}),
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
    ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }