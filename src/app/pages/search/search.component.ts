import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/Movie';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchMovie: string = "";
  movies: Movie[] = [];
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.searchMovie = params['movie'];
      if(this.searchMovie){
        this.getMovies();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getMovies(): void {
    this.movies = this.tmdbService.getMovies(this.searchMovie)
  }

}
