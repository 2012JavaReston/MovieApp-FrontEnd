import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LikedComponent } from './pages/liked/liked.component';
import { LoginComponent} from './pages/login/login.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { WatchComponent } from './pages/watch/watch.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent}, 
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:movie', component: SearchComponent },
  { path: 'liked', component: LikedComponent, canActivate: [LoggedInGuard]},
  { path: 'movieInfo/:id', component: MovieInfoComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'watch', component: WatchComponent, canActivate: [LoggedInGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
