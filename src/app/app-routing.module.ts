import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForecastPageComponent} from './forecast-page/forecast-page.component';
import {FavoritesPageComponent} from './favorites-page/favorites-page.component';

const routes: Routes = [
  { path: '', redirectTo: "forecast", pathMatch: 'full' },
  { path: 'forecast', component: ForecastPageComponent, pathMatch: 'prefix' },
  { path: 'forecast/:id', component: ForecastPageComponent },
  { path: 'favorites', component: FavoritesPageComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
