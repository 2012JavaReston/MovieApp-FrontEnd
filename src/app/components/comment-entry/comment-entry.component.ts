import { Component, Input, OnInit } from '@angular/core';

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

  editable: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let local = localStorage.getItem("user");
    if(typeof local === "string"){
      let user = JSON.parse(local).id;
      this.editable = this.userName === user;
    }
  }

  deleteComment(){
    console.log("delete");
  }

  updateComment(){
    console.log('update');
  }

}
