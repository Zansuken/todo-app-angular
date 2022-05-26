import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/components/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  theme$: Observable<string>

  isLogin: boolean = true;

  username: string = '';
  password: string = '';
  passwordCheck: string = '';
  wrongCridentials = false;

  constructor(private userService: UserService,
    private store: Store<{ theme: string }>,
    private router: Router) {
    this.theme$ = this.store.select('theme');
  }

  ngOnInit(): void {

  }

  setUsername(username: string): void {
    this.username = username;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setPasswordCheck(passwordCheck: string): void {
    this.passwordCheck = passwordCheck;
  }
  login() {
    this.wrongCridentials = false;

    if (this.username === '' || this.password === '') {
      this.wrongCridentials = true;
      alert('username or password is empty');
      return;
    }


    this.userService.login(this.username, this.password).subscribe(result => {
      console.log(result);

      if (this.userService.userFound === false) {
        this.wrongCridentials = true;
        alert('User not found or password is wrong');
        return;
      }

      this.router.navigate(['/home/' + `${this.userService.user._id}`]);
    }
      , error => {
        this.wrongCridentials = true;
      }
    );
  }

  register() {
    this.wrongCridentials = false;

    if (this.password !== this.passwordCheck) {
      this.wrongCridentials = true;
      alert('passwords doesn\'t match');
      return;
    }
    this.userService.register(this.username, this.password, this.passwordCheck).subscribe(result => {

      console.log(result);

      this.router.navigate(['/home/' + `${this.username}`]);
    }
      , error => {
        this.wrongCridentials = true;
        console.dir(error);
      }
    );
  }

  toggleView(): void {
    this.isLogin = !this.isLogin;
  }

}
