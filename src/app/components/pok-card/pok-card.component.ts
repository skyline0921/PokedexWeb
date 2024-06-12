import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

interface IPokemon {
  name: string
}

@Component({
  selector: 'app-pok-card',
  templateUrl: './pok-card.component.html',
  styleUrls: ['./pok-card.component.scss']
})
export class PokCardComponent implements OnInit {
  constructor(private http: HttpClient) {}
 @Input() pokemon!: any;
 @Input() index: number = 0;

  ngOnInit(): void {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.pokemon.name}`
    this.http.get(url).subscribe({
    next: ((value: any) => {
      this.pokemon = value;
    })
    })
  }

  colors: string = 'typeColors'

  convertStringToNumber(value:number) {
    if(value < 10){
      return "0" + value;
    }
    return value
  }

  pokemonType(pokemon: any) {
    console.log(pokemon.types[0].type.name)
    return pokemon.types[0].type.name 
    }
  }