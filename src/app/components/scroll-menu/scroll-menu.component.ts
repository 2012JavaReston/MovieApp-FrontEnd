import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-menu',
  templateUrl: './scroll-menu.component.html',
  styleUrls: ['./scroll-menu.component.css']
})
export class ScrollMenuComponent implements OnInit {

  constructor() { }

  listName : string = "Placeholder List";
  movieArray: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; 

  ngOnInit(): void {
  }

}
