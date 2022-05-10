import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  constructor() { }

  themeIcon = {
    dark: 'assets/images/icon-sun.svg',
    light: 'assets/images/icon-moon.svg'
  }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.themeIcon.dark = this.themeIcon.dark === 'assets/images/icon-sun.svg' ? 'assets/images/icon-moon.svg' : 'assets/images/icon-sun.svg';
  }

}
