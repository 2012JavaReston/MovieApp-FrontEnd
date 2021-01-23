import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.css']
})
export class LikedComponent implements OnInit {

  movies = [{img:"https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/89058/93685/Joker-2019-Final-Style-steps-Poster-buy-original-movie-posters-at-starstills__62518.1572351179.jpg?c=2?imbypass=on", details: "Joker"},
            {img: "https://images-na.ssl-images-amazon.com/images/I/71pwYomGC1L._AC_SY741_.jpg", details: "Back to the Future"},
            {img: "https://images.moviepostershop.com/dora-and-the-lost-city-of-gold-movie-poster-1000779403.jpg", details: "Dora the Explorer"}
          ]
  constructor() { }

  ngOnInit(): void {
  }

}
