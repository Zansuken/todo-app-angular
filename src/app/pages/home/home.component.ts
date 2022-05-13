import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  theme$: Observable<string>;

  constructor(private store: Store<{ theme: string }>) {
    this.theme$ = this.store.select('theme');
  }

  ngOnInit(): void {
  }

}
