import {DailyForecast} from './daily-forecast';

export interface ForecastData {
  temperatureSymbol: string;
  Headline: {EffectiveDate: string, Text: string};
  DailyForecasts: DailyForecast[];
}
