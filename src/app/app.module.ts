import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
<<<<<<< HEAD
import { NavbarComponent } from './navbar/navbar.component';
=======
import { SearchComponent } from './pages/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollMenuComponent } from './components/scroll-menu/scroll-menu.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { LikedComponent } from './pages/liked/liked.component';
import { MovieSearchCardComponent } from './components/movie-search-card/movie-search-card.component';
>>>>>>> main

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
<<<<<<< HEAD
    NavbarComponent
   
=======
    SearchComponent,
    ScrollMenuComponent,
    MovieItemComponent,
    LikedComponent,
    MovieSearchCardComponent
>>>>>>> main
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
