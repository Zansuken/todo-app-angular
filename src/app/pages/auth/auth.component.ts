import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/components/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  theme$: Observable<string>

  isLogin: boolean = true;

  constructor(public userService: UserService,
    private store: Store<{ theme: string }>) {
    this.theme$ = this.store.select('theme');
  }

  ngOnInit(): void {
  }

  toggleView(): void {
    this.isLogin = !this.isLogin;
  }

}
