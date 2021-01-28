import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { ApiService } from 'src/app/services/api.service';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  watchListDetails: any[] = []; 
  watchList: Movie[] = []; 
  
  constructor(private api: ApiService, private tmdb: TmdbService) { }

  ngOnInit(): void {
    this.api.getWatchList()
    .then(
      data =>{
        this.watchListDetails = data;  
      }
    ).then(
      () =>{
        for(let movie of this.watchListDetails){
          let selected = this.tmdb.getMovieById(movie.movieID); 
          selected.subscribe(details =>{
            this.watchList.push(this.tmdb.dataToMovie(details)); 
          })
        }
      }
    )
    .catch(error =>{
      console.log(error); 
    })
  }

  remove(movie: Movie) {
    
   /** Will need to remove from the db, but this removes from view.*/
    this.watchList = this.watchList.filter(selected => selected != movie); 
    
  }


}
