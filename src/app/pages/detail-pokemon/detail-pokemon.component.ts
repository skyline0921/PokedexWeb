import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Routes } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IAbility, IPokemon, IType } from 'src/app/models/pokemon';
@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss'],
})
export class DetailPokemonComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) {}

  pokemon: IPokemon | undefined;
  pokemonName = '';
  type: string = '';
  powersAndSkills = '';
  pokes: number[] = [];
  teamPokemons: {id:number, detail:IPokemon | undefined}[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.pokemonName = value['name'];
      // this.pokemon = value;
    });

    const url = `https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`;
    this.http.get<IPokemon>(url).subscribe({
      next: (value) => {
        this.pokemon = value;

        this.type = value.types.map((value: IType) => value.type.name).join(', ');

        this.powersAndSkills = value.abilities
          .map((value: IAbility) => value.ability.name)
          .join(', ');
      },
    });
  }

  pokemonType(pokemon: IPokemon | undefined) {
    // Método para obter o nome do primeiro tipo do Pokémon.
    return pokemon?.types[0].type.name || '' // Retorna o nome do primeiro tipo do Pokémon.
  }

  addPok() {
    const savedPokemons = localStorage.getItem('pokemonsSaved');
    
    if (savedPokemons) {
      this.teamPokemons = JSON.parse(savedPokemons);
    }
    if(this.teamPokemons.filter((el) => el.detail?.name == this.pokemon?.name).length > 0) {
      this.notifierService.notify('error','This pokemon has already been added')
    } 
    else {
      this.notifierService.notify('success','This pokemon added')
      if (this.teamPokemons.length == 6) {
        this.notifierService.notify('error','Full pokedex')
        return;
      }

      this.teamPokemons.push({
        id: (this.pokemon?.id || 0) - 1,
        detail: this.pokemon,
      });
    }

    localStorage.setItem('pokemonsSaved', JSON.stringify(this.teamPokemons))
  }
}