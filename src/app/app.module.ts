import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokCardComponent } from './components/pok-card/pok-card.component';
import { FooterComponetComponent } from './footer/footer-componet/footer-componet.component';
import { DetailPokemonComponent } from './pages/detail-pokemon/detail-pokemon.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PokedexComponent } from './pages/pokedex/pokedex.component';

@NgModule({
  declarations: [
    AppComponent,
    PokCardComponent,
    FooterComponetComponent,
    DetailPokemonComponent,
    PokedexComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    RouterModule.forRoot([]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }