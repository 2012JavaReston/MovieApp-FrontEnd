import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { Movie } from '../interfaces/Movie'; 
import { TmdbService } from './tmdb.service';
import { MovieInfoComponent } from '../pages/movie-info/movie-info.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/MovieApp/api/';
  // private baseUrl = 'http://ec2-18-216-66-77.us-east-2.compute.amazonaws.com:8090/MovieApp/api/';
  private loggedInUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router, private tmdb: TmdbService) {}


  loginUser(user: User): Promise<string>{
    return new Promise((resolve, reject) =>{
      this.http.post<User>(`${this.baseUrl}user/login`, user, {withCredentials: true}).subscribe(data => {
        if(data != null && data.firstName != null){ 
          let userStore = JSON.stringify(data); 
          localStorage.setItem("user", userStore); 
          this.loggedInUser.next(data); 
          this.router.navigate(['home']); 
          console.log(this.loggedInUser);   
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

  getLikedMovies(): Promise<any>{
    let likedMovies: Movie[] = []; 
    console.log(this.loggedInUser.value?.id); 
    this.loggedInUser.subscribe(value => console.log(value))

    return new Promise((resolve, reject) => { 
      this.http.get<any>(`${this.baseUrl}lists/user/likedlist?userID=${this.loggedInUser.value?.id}`, {withCredentials: true})
      .subscribe((data => {
        console.log(data); 
        if(data &&  data.length!=0){
          for(let movie of data){  
              let selected = this.tmdb.getMovieById(movie.movieID);      
              selected.subscribe(details => {
                likedMovies.push(this.tmdb.dataToMovie(details));  
              }) 
          }
          return resolve(likedMovies); 
        } else {         
          return  reject("No movies"); 
        }
        
      }))
    }) 
  }

  getWatchList(): Promise<any>{
    let watchList: Movie[] = []; 
    //  this.loggedInUser.subscribe(console.log);
    this.loggedInUser.subscribe(value => console.log(value))
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.baseUrl}lists/user/watchlist?userID=${this.loggedInUser.value?.id}`, {withCredentials: true})
      .subscribe((data => { 
        if(data.length!=0){
          for(let movie of data){  
            let selected = this.tmdb.getMovieById(movie.movieID);      
            selected.subscribe(details =>{
              watchList.push(this.tmdb.dataToMovie(details));
            }) 
          }
          return resolve(watchList); 
        } else {         
          return  reject("No movies"); 
        }
        
      }))
    }) 
  }

  
}


