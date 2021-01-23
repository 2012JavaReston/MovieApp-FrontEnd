import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollMenuComponent } from './components/scroll-menu/scroll-menu.component';
import { LikedComponent } from './pages/liked/liked.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
<<<<<<< HEAD
    ScrollMenuComponent,
    LikedComponent
=======
    SearchComponent,
    ScrollMenuComponent
>>>>>>> 944e3cc2993c0cb4969202166f33d89b2366d718
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
