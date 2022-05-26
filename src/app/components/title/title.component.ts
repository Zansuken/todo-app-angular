import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  isUserLoggedIn: boolean = true;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.router.url === '/login' ? false : true
  }

  logOut() {
    this.userService.logOut().subscribe(result => {
      this.isUserLoggedIn = false;
      this.router.navigate(['/login']);
    });
  }

}
