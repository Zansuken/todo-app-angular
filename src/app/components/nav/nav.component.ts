import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  theme$: Observable<string>;

  constructor(private store: Store<{ theme: string }>) {
    this.theme$ = this.store.select('theme');
  }

  backgroundImg = {
    url: './assets/images/bg-desktop-dark.jpg',
    alt: 'Background image'
  }

  ngOnInit(): void {
  }

}
