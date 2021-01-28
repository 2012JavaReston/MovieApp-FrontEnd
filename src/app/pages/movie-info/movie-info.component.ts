import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/Movie';
import { ApiService } from 'src/app/services/api.service';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Comment } from 'src/app/interfaces/Comment';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  movie!: Movie;
  id!: number;
  comments!: Comment[];
  commentContent: string = "";
 
  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.movie = {
      id:0,
      title:"",
      description:"",
      image:"",
      releaseDate: "",
      genre: "",
      rating: 0
    }
    this.route.params.subscribe(
      (params) => {
        this.id = params['id'];
    });
    
    this.tmdbService.getMovieById(this.id).subscribe(
      (data) => {
        this.movie = this.tmdbService.dataToMovie(data);
        this.refreshComponent();
      }
    );
  }

  addComment(){
    let local = localStorage.getItem("user");
    let user: number = 0;
    if(typeof local === 'string'){
      user = JSON.parse(local).id;
    }
    let entry: Comment = {
      id : 0,
      comment: this.commentContent,
      movieID: this.id,
      userID: user
    }
    this.apiService.addCommentByMovieId(entry).subscribe(
      (data) => {
        this.refreshComponent();
      }
    );
    this.commentContent = "";
  }

  refreshComponent(){
    this.apiService.getCommentsByMovieId(this.movie.id).subscribe(
      (data) => {
        this.comments = data;
      });
  }

}
