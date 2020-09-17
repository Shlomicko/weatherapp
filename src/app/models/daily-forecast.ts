export interface DailyForecast {
  Date: string;
  Temperature: {Minimum: {Value: number, UnitType: number}, Maximum: {Value: number, UnitType: number}};
  Day: {Icon: number, IconPhrase: string, HasPrecipitation: boolean};
  Night: {Icon: number, IconPhrase: string, HasPrecipitation: boolean};
}
