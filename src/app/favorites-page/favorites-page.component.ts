import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {favoritesSelector} from '../store/favorite.state';
import {FavoriteData} from '../models/favorite-data';
import {ToggleFavoritesAction} from '../store/favorite.actions';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {

  public favorites: FavoriteData[] = [];

  constructor(private store: Store<AppState>) {
    store.select(favoritesSelector).subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  ngOnInit(): void {

  }

  public onFavoriteToggle(favorite: FavoriteData) {
    this.store.dispatch(new ToggleFavoritesAction(favorite));
  }
}
