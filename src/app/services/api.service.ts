import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Comment } from '../interfaces/Comment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/MovieApp/api/';
  // private baseUrl = 'http://ec2-18-216-66-77.us-east-2.compute.amazonaws.com:8090/MovieApp/api/';
  private loggedInUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}


  loginUser(user: User): Promise<string>{
    return new Promise((resolve, reject) =>{
      this.http.post<User>(`${this.baseUrl}user/login`, user).subscribe(data => {
        if(data != null && data.firstName != null){ 
          let userStore = JSON.stringify(data); 
          localStorage.setItem("user", userStore); 
          this.loggedInUser.next(data); 
          this.router.navigate(['home']);  
          return resolve("Succesfully Logged In")  
        } else {
          return reject("Username or Password is incorrect");
        }  
      })
    }) 
  }

  isLoggedIn(): boolean{
    let loggedIn = false; 
    if(this.loggedInUser.value){ 
      loggedIn = true; 
    } else {
      this.logInFromLocalStorage(); 
      if(this.loggedInUser.value){
        loggedIn = true; 
      }
    }
    return loggedIn; 
  }

  private logInFromLocalStorage() {
    let loggedIn = localStorage.getItem('user');
    if (typeof loggedIn === 'string')
      this.loggedInUser.next(JSON.parse(loggedIn));
  }

  logout(){
    console.log("Clicking this");
    this.loggedInUser.next(null); 
    localStorage.clear(); 
    
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

  getCommentsByMovieId(id: number) : Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.baseUrl}comment/movieID/?movieID=${id}`);
  }

  addCommentByMovieId(entry: Comment){
    return this.http.post<Comment>(`${this.baseUrl}comment/insert`, entry);
  }

  deleteCommentById(id: number){
    return this.http.delete(`${this.baseUrl}comment/delete/?id=${id}`);
  }
}


