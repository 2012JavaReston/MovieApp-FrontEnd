import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  watchList: Movie[] =[]; 
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getWatchList()
    .then(
      data =>{
        this.watchList = data;  
      }
    ).catch(error =>{
      console.log(error); 
    })
  }

}
