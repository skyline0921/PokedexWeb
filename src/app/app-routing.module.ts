import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPokemonComponent } from './pages/detail-pokemon/detail-pokemon.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';

const routes: Routes = [
  { path: '', redirectTo: 'generation', pathMatch: 'full' }, //default route
  {
    path: 'pokemon/:name',
    component: DetailPokemonComponent
  },
  {
    path: 'generation',
    component: PokedexComponent
  },
  { path: '**', redirectTo: 'generation' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
