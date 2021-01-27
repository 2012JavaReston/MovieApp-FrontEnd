import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comment-entry',
  templateUrl: './comment-entry.component.html',
  styleUrls: ['./comment-entry.component.css']
})
export class CommentEntryComponent implements OnInit {
  @Input()
  userName!: string;
  @Input()
  commentText!: string;
  @Input()
  id!: number;

  editable: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    let local = localStorage.getItem("user");
    if(typeof local === "string"){
      let user = JSON.parse(local).id;
      this.editable = this.userName === user;
    }

  }

  deleteComment(){
    this.apiService.deleteCommentById(this.id);
  }

  updateComment(){
    console.log('update');
  }

}
