import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatOption} from '@angular/material/core';
import {fromEvent, Subject} from 'rxjs';
import {CityLocation} from '../models/city-location';
import {debounceTime, distinctUntilChanged, filter, map, takeUntil} from 'rxjs/operators';
import {WeatherService} from '../services/weather.service';
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {ActionNames} from "../store/action-names";
import {autoCompleteResultsSelector} from "../store/autocomplete.state";
import {FetchWeatherDataAction, SelectLocationKeyAction} from "../store/weather.actions";
import {SaveLocationKeyToLocalStorageAction} from "../store/configurations.actions";
import {getIsSaveLocationKeySelector} from "../store/configuration.state";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cityQuery', {read: ElementRef}) cityQuery;

  public autoFormControl: FormControl = new FormControl();
  public citiesList: CityLocation[] = [];
  public selectedCity: CityLocation;
  public isSaveLastForecast: boolean;

  private dispose$: Subject<void> = new Subject<void>();

  constructor(private _weatherService: WeatherService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select(autoCompleteResultsSelector).subscribe((cities) => {
      this.citiesList = cities;
    });

    this.store.select(getIsSaveLocationKeySelector).subscribe((save) => {
      this.isSaveLastForecast = save;
    });
  }

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.cityQuery.nativeElement, 'keyup').pipe(
      takeUntil(this.dispose$),
      map(event => (event.target as HTMLInputElement).value),
      debounceTime(500),
      filter((query: string) => {
        return query !== '';
      }),
      distinctUntilChanged()
    ).subscribe((query: string) => {
      this.store.dispatch({type: ActionNames.GET_AUTOCOMPLETE, payload: query});
    });
  }

  public onLocationItemClick(event: MatAutocompleteSelectedEvent): void {
    const items: MatOption[] = event.source.options.toArray();
    const index = items.indexOf(event.option);
    this.selectedCity = this.citiesList[index];
    const key: string = this.selectedCity.Key;
    this.store.dispatch(new SelectLocationKeyAction(key));

    if (this.isSaveLastForecast) {
      this.store.dispatch(new SaveLocationKeyToLocalStorageAction(key));
    }
  }

  ngOnDestroy(): void {
    this.dispose$.next();
    this.dispose$.complete();
  }
}
