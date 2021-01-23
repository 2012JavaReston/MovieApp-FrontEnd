import { Injectable } from '@angular/core';
import { ApiKey } from 'src/secrets/ApiKey';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  private movieId: number = 0;
  private baseUrl : string = "https://api.themoviedb.org/3/movie/"+this.movieId+"?api_key=";
  constructor(private httpClient: HttpClient) { }

  getMovieById(id: number){

  }
}
