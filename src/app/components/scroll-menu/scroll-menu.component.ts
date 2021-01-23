import { Component, Input, OnInit } from '@angular/core';

interface MovieItem{
  id: number;
  imageUrl: string;
  title: string;
}

@Component({
  selector: 'app-scroll-menu',
  templateUrl: './scroll-menu.component.html',
  styleUrls: ['./scroll-menu.component.css']
})
export class ScrollMenuComponent implements OnInit {

  @Input()
  listName : string = "";
  
  @Input()
  movieArray: any[] = [];

  constructor() { }

  ngOnInit(): void {
    //Placeholder stuff
    this.listName = "Placeholder List";
    this.movieArray = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10", "test11", "test12"]
  }

}
