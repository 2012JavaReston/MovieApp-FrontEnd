import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { ApiService } from 'src/app/services/api.service';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.css']
})
export class LikedComponent implements OnInit {

  likedMoviesData: any[] = []; 
  likedMovies: Movie[] = []; 
  constructor(private api: ApiService, private tmdb: TmdbService) { }

  ngOnInit(): void {

      //  Trying something here
      this.api.userLikedList.subscribe(movies =>{
        this.likedMovies = movies;
      })


     this.api.getLikedMovies()
     .then(
       data => {
         this.likedMoviesData = data;  
       } 
     )
     .then(
        () =>{
          for(let movie of this.likedMoviesData){
            let selected = this.tmdb.getMovieById(movie.movieID); 
            selected.subscribe(details => {
              let tempArray: Movie[] = [...this.likedMovies, this.tmdb.dataToMovie(details)]; 
              this.api.userLikedList.next(tempArray); 
              console.log(this.likedMovies); 
              // this.likedMovies.push(this.tmdb.dataToMovie(details)); 
            })
          }
        }
     )
     .catch(error => {
       console.log(error); 
     })

  
  }

  logout(){
    this.api.logout(); 
  }

  remove(movie: Movie){ 
    this.api.removeFromLikedList(movie.id)
    .then(
      info =>{
        console.log(info); 
        let temp = this.likedMovies.filter(selected => selected != movie);
        this.api.userLikedList.next(temp); 
        console.log(this.likedMovies); 

        // this.likedMovies = this.likedMovies.filter(selected => selected != movie); 
      }
    )
    .catch( error =>{
      console.log(error); 
    })
  }

}
