import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/Movie';
import { ApiKey } from '../../secrets/ApiKey';
import { Observable } from 'rxjs';
import { TmdbCollections } from '../interfaces/TmdbCollections';
import { MovieInfoComponent } from '../pages/movie-info/movie-info.component';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {

  private baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + ApiKey + '&query=';

  constructor(private http: HttpClient) {}

  public getMovies(url: string): Observable<string> {
    return this.http.get<string>(this.baseUrl + url)
  }

  public getMovieCollection(type: string): Movie[]{
    let movieList : Movie[] = [];
    let collectionBase : string = 'https://api.themoviedb.org/3/movie/';

    this.http.get<string>(collectionBase + type + '?api_key=' + ApiKey).subscribe(
      (data) => {
        this.dataToMovieArray(data, movieList);
      }
    );
    return movieList;
  }

  public getMovieById(id: number): Movie{
    let movie: Movie = {
      id: 0,
      title: '',
      description: '',
      image: '',
      releaseDate: '',
      genre: '',
      rating: 0
    };
    let collectionBase : string = 'https://api.themoviedb.org/3/movie/';
    this.http.get<string>(collectionBase + id + '?api_key=' + ApiKey).subscribe(
      (data) => {
        let json: any = data;
        movie.id =  json["id"];
        movie.title =  json["title"];
        movie.image = `https://image.tmdb.org/t/p/w500/${json["poster_path"]}`;
        movie.genre = json["genres"];
        movie.rating = json["vote_average"];
        movie.description = json["overview"];
        movie.releaseDate = json["release_date"];
      }
    );
    return movie;
  }

  protected dataToMovieArray(data : any, movies: Movie[]){
    let jsonMovies: any = data["results"];
    jsonMovies.forEach((jsonMovie: any) => {
      let movie: Movie = {
        id: 0,
        title: '',
        description: '',
        image: '',
        releaseDate: '',
        genre: '',
        rating: 0
        }
      if(jsonMovie["poster_path"] != null){
        movie.id = jsonMovie["id"];
        movie.title = `${jsonMovie["title"]}`;
        movie.description = `${jsonMovie["overview"]}`;
        movie.image = `https://image.tmdb.org/t/p/w200/${jsonMovie["poster_path"]}`;
        movie.releaseDate = `${jsonMovie["release_date"]}`;
        movies.push(movie);
      }
    });
  }

  public dataToMovies(data : any): Movie[] {
    let movies: Movie[] = []
    let jsonMovies: any = data["results"];
    jsonMovies.forEach((jsonMovie: any) => {
      let movie: Movie = {
        id: 0,
        title: '',
        description: '',
        image: '',
        releaseDate: '',
        genre: '',
        rating: 0
        }
      if(jsonMovie["poster_path"] != null){
        movie.id = jsonMovie["id"];
        movie.title = `${jsonMovie["title"]}`;
        movie.description = `${jsonMovie["overview"]}`;
        movie.image = `https://image.tmdb.org/t/p/w200/${jsonMovie["poster_path"]}`;
        movie.releaseDate = `${jsonMovie["release_date"]}`;
        movies.push(movie);
      }
    });
    return movies;
  }
}
