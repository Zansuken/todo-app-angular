import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from './task.service';
import { Router } from '@angular/router';

export interface User {
  _id: string;
  username: string;
  password: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userFound: boolean = false;

  user: User = {
    _id: '',
    username: '',
    password: '',
    tasks: []
  };

  userId: string = '';

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(environment.userUrl);
  }

  getAllUsers() {
    return this.httpClient.get<User[]>(environment.userUrl);
  }

  login(pUSername: string, pPassword: string) {

    return new Observable<boolean>(observer => {

      this.getAllUsers().subscribe(result => {
        const user = result.find(user => user.username === pUSername && user.password === pPassword);

        console.log(user);

        if (user) {
          this.userFound = true;
          this.user = user;
          observer.next(true);
          observer.complete();
        } else {
          this.userFound = false;
          observer.next(false);
          observer.complete();
        }
      }
        , error => {
          observer.next(false);
        }
      );
    })
  }

  logOut() {
    return new Observable<boolean>(observer => {
      this.httpClient.get(environment.userUrl).subscribe(result => {
        observer.next(true);
        observer.complete();
      }, error => {
        observer.error(false);
        observer.complete();
      });
    })
  }

  register(pUsername: string, pPassword: string, pPasswordCheck: string) {
    const registerData = {
      username: pUsername,
      password: pPassword,
      passwordCheck: pPasswordCheck,
      tasks: <Task>[]
    };

    if (pPassword !== pPasswordCheck) {
      return new Observable<boolean>(observer => {
        observer.error(false);
        observer.complete();
      })
    }

    return new Observable<boolean>(observer => {
      this.httpClient.post<User>(environment.userUrl, registerData).subscribe(result => {
        observer.next(true);
        observer.complete();
      }, error => {
        observer.error(false);
        observer.complete();
      });
    })
  }

  addTask(task: Task) {
    this.userId = (this.router.url).substring(6)
    this.getAllUsers().subscribe(result => {
      for (const user of result) {
        if (user._id === this.userId) {
          user.tasks.push(task);
          this.httpClient.put<User>(environment.userUrl + `/${this.userId}`, user).subscribe(result => {
            console.log(result);
          }
            , error => {
              console.log(error);
            }
          );
        }
      }
    })
  }
}
