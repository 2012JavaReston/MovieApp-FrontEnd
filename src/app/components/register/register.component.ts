import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = ""; 
  password: string= ""; 
  fName: string=""; 
  lName: string=""; 
  email: string=""; 

  onSubmit(): void{
    console.log(this.username);
    console.log(this.password); 
    console.log(this.fName); 
    console.log(this.lName); 
    console.log(this.email)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
