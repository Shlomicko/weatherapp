export interface CurrentConditionsData {
  LocationKey: string;
  LocalObservationDateTime: string;
  WeatherText: string;
  WeatherIcon: number;
  Temperature: {Metric: {Value: number, Unit: string, UnitType: number}, Imperial: {Value: number, Unit: string, UnitType: number}};
}
