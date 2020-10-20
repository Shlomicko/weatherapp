import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {FavoriteData} from "../models/favorite-data";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private static readonly LOCATION_KEY: string = 'location_key';
  private static readonly SAVE_LAST_FORECAST: string = 'save_last_forecast';
  private static readonly FAVORITES: string = 'favorites';

  constructor() { }

  public saveLocationKey(locationKey: string): Observable<string> {
    return of(this._saveLocationKey(locationKey));
  }

  private _saveLocationKey(locationKey: string): string{
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
    localStorage.setItem(StorageService.SAVE_LAST_FORECAST, save ? 'true' : 'false');
    return save;
  }

  public saveFavorites(favs: FavoriteData[]): Observable<FavoriteData[]>{
    return of(this._saveFavorites(favs));
  }

  private _saveFavorites(favs: FavoriteData[]): FavoriteData[]{
    localStorage.setItem(StorageService.FAVORITES, JSON.stringify(favs));
    return this._getFavorites();
  }

  public getFavorites(): Observable<FavoriteData[]>{
    return of(this._getFavorites());
  }

  private _getFavorites(): FavoriteData[]{
    const favorites: FavoriteData[] = JSON.parse(localStorage.getItem(StorageService.FAVORITES));
    return favorites;
  }
}
