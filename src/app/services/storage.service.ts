import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {FavoriteData} from "../models/favorite-data";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private static readonly LOCATION_KEY: string = 'locationKey';
  private static readonly LAST_VISITED_LOCATION_KEY: string = 'lastVisitedLocationKey';
  private static readonly FAVORITES: string = 'favorites';
  private static readonly HOME_PAGE: string = 'homepage';

  constructor() {
  }

  public saveLocationKey(locationKey: string): Observable<string> {
    return of(this._saveLocationKey(locationKey));
  }

  private _saveLocationKey(locationKey: string): string {
    localStorage.setItem(StorageService.LOCATION_KEY, locationKey);
    return locationKey;
  }

  public getSavedLocationKey(): Observable<string> {
    return of(this._getSavedLocationKey());
  }

  private _getSavedLocationKey(): string {
    const key: string = localStorage.getItem(StorageService.LOCATION_KEY);
    return key;
  }

  public setSaveLastForecast(save: boolean): Observable<boolean> {
    return of(this._setSaveLastForecast(save));
  }

  private _setSaveLastForecast(save: boolean): boolean {
    localStorage.setItem(StorageService.LAST_VISITED_LOCATION_KEY, save ? 'true' : 'false');
    return save;
  }

  public saveFavorites(favs: FavoriteData[]): Observable<FavoriteData[]> {
    return of(this._saveFavorites(favs));
  }

  private _saveFavorites(favs: FavoriteData[]): FavoriteData[] {
    localStorage.setItem(StorageService.FAVORITES, JSON.stringify(favs));
    return this._getFavorites();
  }

  public getFavorites(): Observable<FavoriteData[]> {
    return of(this._getFavorites());
  }

  private _getFavorites(): FavoriteData[] {
    const favorites: FavoriteData[] = JSON.parse(localStorage.getItem(StorageService.FAVORITES));
    return favorites;
  }

  public setHomePage(key: string): Observable<string> {
    return of(this._setHomePage(key));
  }

  private _setHomePage(key: string): string {
    localStorage.setItem(StorageService.HOME_PAGE, key);
    return localStorage.getItem(StorageService.HOME_PAGE);
  }

  public getHomePage(): Observable<string> {
    return of(this._getHomePage());
  }

  private _getHomePage(): string {
    const key: string = localStorage.getItem(StorageService.HOME_PAGE);
    return key === 'undefined' ? null : key;
  }
}
