import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbCollections } from 'src/app/interfaces/TmdbCollections';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search: String = "";
  collection: any = TmdbCollections;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickSearch(): void {
    console.log(`SEARCH: ${this.search}`)
    this.router.navigate(['/search', this.search]);
  }

}
