import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/Movie';
import { ApiKey } from '../../secrets/ApiKey';
import { TmdbCollections } from '../interfaces/TmdbCollections';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {

  private baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + ApiKey + '&query=';

  constructor(private http: HttpClient) {}

  public getMovies(url: string): Movie[] {
    let movies: Movie[] = [];
    this.http.get<string>(this.baseUrl + url).subscribe(
      (data: any) => {
        this.dataToMovieArray(data, movies);
      }
    );
    return movies;
  }

  public getMovieCollection(type: string): Movie[]{
    let movieList : Movie[] = [];
    let collectionBase : string = 'https://api.themoviedb.org/3/movie/';

    this.http.get<string>(collectionBase + type + '?api_key=' + ApiKey).subscribe(
      (data) => {
        console.log(data);
        this.dataToMovieArray(data, movieList);
        console.log("MovieList ready")
      }
    );
    return movieList;
  }

  protected dataToMovieArray(data : any, movies: Movie[]){
    let jsonMovies: any = data["results"];
    jsonMovies.forEach((jsonMovie: any) => {
      let movie: Movie = {
        id: 0,
        title: '',
        description: '',
        image: '',
        releaseDate: ''
      }
      if(jsonMovie["poster_path"] != null){
        movie.id = jsonMovie["id"];
        movie.title = `${jsonMovie["title"]}`;
        movie.description = `${jsonMovie["overview"]}`;
        movie.image = `https://image.tmdb.org/t/p/original${jsonMovie["poster_path"]}`;
        movie.releaseDate = `${jsonMovie["release_date"]}`;
        movies.push(movie);
      }
    });
  }
}
