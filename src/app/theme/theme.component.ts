import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setTheme } from '../theme.actions';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {

  theme$: Observable<string>

  constructor(private store: Store<{ theme: string }>) {
    this.theme$ = this.store.select('theme');
  }

  setTheme() {
    this.store.dispatch(setTheme());
  }

}
