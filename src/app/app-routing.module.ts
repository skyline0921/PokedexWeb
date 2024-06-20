import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPokemonComponent } from './pages/detail-pokemon/detail-pokemon.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PokTeamComponent } from './pok-team/pok-team.component';

const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children:[
      {
        path: 'generation',
        component: PokedexComponent
      },
      {
        path: 'pokemon/:name',
        component: DetailPokemonComponent
      },
      {
        path: 'team',
        component: PokTeamComponent
      },
      { path: '**', redirectTo: 'generation' }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
