import { Component, Input, OnInit } from '@angular/core';

/**
 * This component requires a URL, ID, and Title to be passed in on initialization
 * Will need to inject a service in constructor to handle redirect
 */

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  constructor() { }
  @Input() imageUrl : string = "";
  
  @Input() movieName: string = "";

  @Input() id: number = 0;

  ngOnInit(): void {
  }

  openMovieInfo(): void{
    console.log("Service injection method to redirect to movie info page using id property");
  }

}
