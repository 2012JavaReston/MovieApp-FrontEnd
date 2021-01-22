import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search: String = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickSearch(): void {
    this.router.navigate(['/search', this.search]);
  }

}
