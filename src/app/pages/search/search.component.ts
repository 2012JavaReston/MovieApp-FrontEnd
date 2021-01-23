import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/Movie';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchMovie: string = "";
  movies: Movie[] = [];
  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
  }

  clickSearchMovie(): void {
    this.movies = this.tmdbService.getMovies(this.searchMovie)
  }

}
