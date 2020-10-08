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

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnDestroy, AfterViewInit {

  @Output() locationSelected = new EventEmitter<CityLocation>();

  @ViewChild('cityQuery', {read: ElementRef}) cityQuery;

  public autoFormControl: FormControl = new FormControl();
  public citiesList: CityLocation[] = [];
  public selectedCity: CityLocation;
  private dispose$: Subject<void> = new Subject<void>();

  constructor(private _weatherService: WeatherService, private store: Store<AppState>) {
    store.select(autoCompleteResultsSelector).subscribe(cities => {
      console.log('AutocompleteComponent', cities);
      this.citiesList = cities;
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
      /*this._weatherService.getAutoCompleteResults(query).subscribe(
        cities => this.citiesList = cities
      );*/
    });
  }

  public onLocationItemClick(event: MatAutocompleteSelectedEvent): void {
    const items: MatOption[] = event.source.options.toArray();
    const index = items.indexOf(event.option);
    this.selectedCity = this.citiesList[index];
    this.locationSelected.emit(this.selectedCity);
  }

  ngOnDestroy(): void {
    this.dispose$.next();
    this.dispose$.complete();
  }
}
