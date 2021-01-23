import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LikedComponent } from './pages/liked/liked.component';
import { LoginComponent} from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent}, 
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent },
  { path: 'liked', component: LikedComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
