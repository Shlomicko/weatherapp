import { Component, Renderer2 } from '@angular/core';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { darkModeSelector } from './store/configuration.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WhetherApp';
  public isDarkMode: boolean = false;

  constructor(private _store: Store<AppState>, private renderer: Renderer2){
    _store.select(darkModeSelector).subscribe((darkMode: boolean) => {
      this.isDarkMode = darkMode;
      darkMode ? this.renderer.addClass(document.body, 'dark-mode') : this.renderer.removeClass(document.body, 'dark-mode');
    });
  }
}
