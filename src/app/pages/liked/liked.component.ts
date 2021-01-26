import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.css']
})
export class LikedComponent implements OnInit {

  likedMovies: Movie[] = []; 
  constructor(private api: ApiService) { }

  ngOnInit(): void {
     this.api.getLikedMovies()
     .then(
       data => {
         this.likedMovies = data; 
       } 
     )
     .catch(error => {
       console.log(error); 
     })

  }

  logout(){
    this.api.logout(); 
  }

}
