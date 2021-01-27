import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/Movie';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchMovie: string = "";
  movies: Movie[] = [];
  private sub: any;
  isMovies: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private location: Location
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.searchMovie = params['movie'];
      if(this.searchMovie){
        this.getMovies();
      } else {
        this.isMovies = false;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getMovies() {
    this.location.go(`search/${this.searchMovie}`);
    this.isMovies = true;
    this.movies = []
    setTimeout(() => {
      this.movies = this.tmdbService.getMovies(this.searchMovie);
    }, 500)
    setTimeout(() => {
      if(this.movies.length === 0){
        this.isMovies = false;
      } else {
        this.isMovies = true;
      }
    },3000)
  }

}
