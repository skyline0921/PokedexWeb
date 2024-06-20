import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pok-team',
  templateUrl: './pok-team.component.html',
  styleUrls: ['./pok-team.component.scss'],
})
export class PokTeamComponent implements OnInit {
  constructor(private http: HttpClient) {}

  pokemon: any;
  sixPokes: number[] = [];
  teamPokemons: any[] = [];

  ngOnInit() {
    const savedPokemons = localStorage.getItem('pokemonsSaved');
    if (savedPokemons) {
      this.teamPokemons = JSON.parse(savedPokemons);
      this.sixPokes = this.teamPokemons.map(pokemon => pokemon.index + 1);
    }
  }

  /*
      gerar os 6 pokemons de forma aleatoria; feito 
      armazenar em um array; feito
      permitir o click só uma vez; feito
      formar o card onde apareça os 6 pokemons na tela pok-team;
      opção de salvar, regerar ou excluir.
      */

  drawPokemon() {
    for (let index = 0; index < 6; index++) {
      const numberOfPoke = Math.floor(Math.random() * (151 - 1 + 1)) + 1;

      if (this.sixPokes.filter((el) => el == numberOfPoke).length > 0) {
        index--;
      } else {
        if (this.sixPokes.length == 6) {
          return;
        }

        this.sixPokes.push(numberOfPoke);
      }
    }
    console.log(this.sixPokes);

    this.sixPokes.forEach((id) => {
      this.getDetailPokemon(id);
    });

    console.log(this.teamPokemons);
  }

  getDetailPokemon(id: number) {
    console.log(id);
    
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    this.http.get(url).subscribe({
      next: (value: any) => {
        console.log(value);
        
        this.teamPokemons.push({index: id-1, detail: value});
      },
    });
  }

  clearAndDrawNewPokemon() {
    this.sixPokes = [];
    this.teamPokemons = [];
    this.drawPokemon();
  }

  savePoks() {
    localStorage.setItem('pokemonsSaved',JSON.stringify(this.teamPokemons))
  }

  deletePoks() {
    this.sixPokes = [];
    this.teamPokemons = [];
    localStorage.removeItem('pokemonsSaved');
  }

}
