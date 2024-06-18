import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Routes } from '@angular/router';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  pokemon: any
  pokemonName = ""
  type = []
  powersAndSkills = []

  ngOnInit(): void {
    this.route.params.subscribe((value)=> {
      this.pokemonName = value["name"]
      this.pokemon = value
    })

    const url = `https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`
    this.http.get(url).subscribe({
    next: ((value: any) => {
      this.pokemon = value;

      this.type = value.types.map((value: any) => value.type.name).join(', ')

      this.powersAndSkills = value.abilities.map((value: any) => value.ability.name).join(', ')
    })
    })
  }

  pokemonType(pokemon: any): string {
    // Método para obter o nome do primeiro tipo do Pokémon.
    return pokemon.types[0].type.name; // Retorna o nome do primeiro tipo do Pokémon.
  }
}