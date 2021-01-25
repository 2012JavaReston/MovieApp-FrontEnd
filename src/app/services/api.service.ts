import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/MovieApp/api/';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user: User) {
    let message = '';
    console.log(user);
    this.http
      .post<User>(`${this.baseUrl}/user/login`, user)
      .subscribe((data) => {
        console.log(data);
        if (data != null) {
          let userStore = JSON.stringify(data);
          console.log(userStore);
          //storing user in local storage? idk if we need it.
          localStorage.setItem('user', userStore);
          this.router.navigate(['home']);
        } else {
          console.log('here');
          message = 'Sorry wrong Username or Password.';
        }
      });

    return message;
  }
  registerNewUser(newUser: User) {
    let message = '';
    console.log(newUser);
    this.http
      .post<User>(`${this.baseUrl}/user/register`, newUser)
      .subscribe((data) => {
        console.log(data);
        if (data != null) {
        } else {
          console.log('USER WAS REGISTERED');
          message = 'USER WAS REGISTERED';
          this.router.navigate(['login']);
        }
      });
    return message;
  }
}
