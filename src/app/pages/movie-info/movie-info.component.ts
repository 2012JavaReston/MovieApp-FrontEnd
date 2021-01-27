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
    this.route.params.subscribe(
      (params) => {
        this.id = params['id'];
    });
    this.movie = this.tmdbService.getMovieById(this.id);
    this.apiService.getCommentsByMovieId(this.id).subscribe(
      (data) => {
        this.comments = data;
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
    this.apiService.addCommentByMovieId(entry);
    this.commentContent = "";
  }

  deleteComment(){

  }

  updateComment(){
    
  }

}
