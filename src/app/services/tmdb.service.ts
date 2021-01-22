import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/Movie';
import { ApiKey } from '../../secrets/ApiKey';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + ApiKey + '&query=';
  
  constructor(
    private http: HttpClient,
    ) { }

  public getMovies(url: string): Movie[]{
    let movies: Movie[] = [];
    this.http.get<string>(this.baseUrl + url).subscribe(
      (data: any) => {
        let jsonMovies: any = data["results"];
        jsonMovies.forEach((jsonMovie: any) => {
          let movie: Movie = {
            title: '',
            description: '',
            image: '',
            releaseDate: ''
          }
          if(jsonMovie["poster_path"] != null){
            movie.title = `${jsonMovie["title"]}`;
            movie.description = `${jsonMovie["overview"]}`;
            movie.image = `https://image.tmdb.org/t/p/original${jsonMovie["poster_path"]}`;
            movie.releaseDate = `${jsonMovie["release_date"]}`;
            movies.push(movie);
          }
        });
      }
    );
    return movies;
  }
}
