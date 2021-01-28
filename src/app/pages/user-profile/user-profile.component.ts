import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Movie } from '../../interfaces/Movie';
import { ApiService } from '../../services/api.service';
import { TmdbService } from '../../services/tmdb.service'; //! remove after testing

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  //TODO: likedMovies!: Movie[];
  user!: User | null;
  likedMovies: Movie[] = []; //! remove after testing

  constructor(
    private apiService: ApiService,
    private tmdbService: TmdbService, //! remove after testing
  ) { }

  ngOnInit(): void {
    this.user = this.apiService.getCurrentUser();
    //TODO: likedMovies = this.apiService.getLikedMovies();
    this.getMovies() //! remove after testing
  }

  //! REMOVE THIS FUNCTION getMovies()
  //! ONLY HERE TO TEST THE DESIGN
  getMovies() {
    this.likedMovies = [];
    this.tmdbService.getMovies("Nemo").subscribe(
      (data) => {
        this.likedMovies = this.tmdbService.dataToMovieArray(data);
      }
    );

  }
}
