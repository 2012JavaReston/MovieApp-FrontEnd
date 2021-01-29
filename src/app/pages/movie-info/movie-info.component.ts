import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/Movie';
import { ApiService } from 'src/app/services/api.service';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Comment } from 'src/app/interfaces/Comment';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css'],
})
export class MovieInfoComponent implements OnInit {
  movie!: Movie;
  id!: number;
  comments!: Comment[];


  commentContent: string = "";
  protected userId!: number;
  liked : boolean = false;
  watch : boolean = false;
 
  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private apiService: ApiService) { }


  ngOnInit(): void {
    this.movie = {
      id: 0,
      title: '',
      description: '',
      image: '',
      releaseDate: '',
      genre: '',
      rating: 0,
    };
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    
    this.tmdbService.getMovieById(this.id).subscribe(
      (data) => {
        this.movie = this.tmdbService.dataToMovie(data);
        this.refreshComponent();
      }
    );

    let local = localStorage.getItem("user");
    if(typeof local === 'string'){
      this.userId = JSON.parse(local).id;

    }

    this.apiService.getListByMovieId(this.id).subscribe(
      (data) => {
        data.forEach((element: any) => {
          if(element.userID === this.userId){
            console.log(element);
            this.liked = element.movieLike;
            this.watch = element.movieWatchList;
          }
        });
        
        //console.log(data[0]);
        // console.log("INSIDE Like: " + this.liked);
        // console.log("INSIDE Watched: " + this.watch);

      }
    )
    // console.log("Like: " + this.liked);
    // console.log("Watched: " + this.watch);
  }

  addComment(){
    let entry: Comment = {
      id: 0,
      comment: this.commentContent,
      movieID: this.id,
      userID: this.userId
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

  likeMovie(){
    this.liked = true;
    this.apiService.addMovieToLikeList(this.movie.id).subscribe(
      (data) => {
        console.log("LIKE ME");
      }
    );
  }

  watchMovie(){
    this.watch = true;
    this.apiService.addMovieToWatchList(this.movie.id).subscribe(
      (data) => {
        console.log("WATCH ME");
      }
    );
  }

  removeLike(){
    this.liked = false;
    this.apiService.removeFromLikedList(this.movie.id).subscribe(
      (data) => {
      }
    )
  }

  removeWatch(){
    this.watch = false;
    this.apiService.removeFromWatchList(this.movie.id).subscribe(
      (data) => {

      }
    )
  }

}
