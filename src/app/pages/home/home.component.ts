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
  constructor(private router: Router) { }
  collection: any = TmdbCollections;

  ngOnInit(): void {
  }

  clickSearch(): void {
    console.log('hit')
    this.router.navigate(['/search', this.search]);
  }

}
