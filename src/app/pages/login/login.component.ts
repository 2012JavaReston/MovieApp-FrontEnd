import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  username: string = '';
  password: string = '';
  loginUser = new User();

  onSubmit(): void {
    this.loginUser.username = this.username;
    this.loginUser.password = this.password;

    this.apiService.loginUser(this.loginUser);
  }

  ngOnInit(): void {}
}
