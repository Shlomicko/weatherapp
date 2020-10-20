import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {favoritesSelector} from '../store/favorite.state';
import {FavoriteData} from '../models/favorite-data';
import {ToggleFavoritesAction} from '../store/favorite.actions';
import {ActionNames} from "../store/action-names";
import {fromEvent, Subject} from "rxjs";
import {filter, map, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit, OnDestroy {

  public favorites: FavoriteData[] = [];
  private dispose$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.select(favoritesSelector).pipe(takeUntil(this.dispose$)).subscribe(favoritesState => {
      console.log('FavoritesPageComponent, ngOnInit', favoritesState.favorites);
      this.favorites = favoritesState.favorites;
    });

    this.store.dispatch({type: ActionNames.GET_FAVORITES});

    fromEvent<MouseEvent>(document, 'mouseup')
      .pipe(
        takeUntil(this.dispose$),
        map(event => (event.target as HTMLElement).parentElement.parentElement
        ),
        filter(element => {
          return element.classList.contains('delete-fav-button');
        }),
      )
      .subscribe(element => {
        const index: number = +element.getAttribute('data-index');
        this.onFavoriteToggle(this.favorites[index]);
        }
      );
  }

  private onFavoriteToggle(favorite: FavoriteData) {
    this.store.dispatch(new ToggleFavoritesAction(favorite));
  }

  ngOnDestroy(): void {
    this.dispose$.next();
    this.dispose$.complete();
  }

}
