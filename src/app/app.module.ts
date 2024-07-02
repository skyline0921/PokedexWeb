import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokCardComponent } from './components/pok-card/pok-card.component';
import { FooterComponetComponent } from './components/footer/footer-componet.component';
import { DetailPokemonComponent } from './pages/detail-pokemon/detail-pokemon.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PokTeamComponent } from './pages/pok-team/pok-team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { notifierOptions } from './constants/utils';
@NgModule({
  declarations: [
    AppComponent,
    PokCardComponent,
    FooterComponetComponent,
    DetailPokemonComponent,
    PokedexComponent,
    NavBarComponent,
    PokTeamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    RouterModule.forRoot([]), BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(notifierOptions),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}