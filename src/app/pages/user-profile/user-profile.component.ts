import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Movie } from '../../interfaces/Movie';
import { ApiService } from '../../services/api.service';
import { TmdbService } from '../../services/tmdb.service'; 

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!: User | null;
  likedMovies: Movie[] = [];

  constructor(
    private apiService: ApiService,
    private tmdbService: TmdbService,
  ) { }

  ngOnInit(): void {
    this.user = this.apiService.getCurrentUser();
    this.apiService.getLikedMovies().subscribe(
      data => {
        console.log(`DATA: ${JSON.stringify(data)}`)
        data.forEach((element: any) => {
          let id: number = element["movieID"];
          this.tmdbService.getMovieById(id).subscribe(
            movie => {
              let addMovie: Movie = this.tmdbService.dataToMovie(movie);
              this.likedMovies.push(addMovie);
            }
          )
        });
        

      }
    )
  }

  logout(){
    this.apiService.logout();
  }
}
