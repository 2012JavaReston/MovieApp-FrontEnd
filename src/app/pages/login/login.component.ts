import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  username: string = ""; 
  password: string= ""; 

  onSubmit(): void{
    console.log(this.username)
    console.log(this.password)
  }

  ngOnInit(): void {
  }

}
