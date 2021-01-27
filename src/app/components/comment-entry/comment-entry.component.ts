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

  constructor() { }

  ngOnInit(): void {
  }

}
