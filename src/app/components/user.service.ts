import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface User {
  _id?: string;
  username?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  url: string = 'https://zansuken-todo-server.herokuapp.com/users';

  loginUser: User = {};

  async getUsers(): Promise<User[]> {
    return lastValueFrom(this.httpClient.get<User[]>(this.url));
  }

  async createUser(user: User): Promise<User> {
    const newUser = await lastValueFrom(this.httpClient.post<User>(this.url, user))
    this.loginUser = newUser;
    return newUser;
  }

  async login(user: User): Promise<User> {
    const loginUser = await lastValueFrom(this.httpClient.post<User>(this.url + '/login', user))
    this.loginUser = loginUser;
    return loginUser;
  }

  async logout(): Promise<User> {
    const logoutUser = await lastValueFrom(this.httpClient.post<User>(this.url + '/logout', this.loginUser))
    this.loginUser = logoutUser;
    return logoutUser;
  }

  async getLoginUser(): Promise<User> {
    return this.loginUser;
  }

  async updateUser(user: User): Promise<User> {
    const updatedUser = await lastValueFrom(this.httpClient.put<User>(this.url + '/' + user._id, user))
    this.loginUser = updatedUser;
    return updatedUser;
  }

  async deleteUser(user: User): Promise<User> {
    const deletedUser = await lastValueFrom(this.httpClient.delete<User>(this.url + '/' + user._id))
    this.loginUser = deletedUser;
    return deletedUser;
  }

  async getUser(user: User): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(this.url + '/' + user._id));
  }

  async getUserByUsername(username: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(this.url + '/username/' + username));
  }

}
