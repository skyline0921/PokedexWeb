import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IPokemon } from 'src/app/models/pokemon';
@Component({
  selector: 'app-pok-card',
  templateUrl: './pok-card.component.html',
  styleUrls: ['./pok-card.component.scss']
})
export class PokCardComponent implements OnInit {
  constructor(private http: HttpClient) {} 

  @Input() pokemon: IPokemon = {} as IPokemon;
  @Input() index: number = 0;

  loading = false;

  ngOnInit(): void {
  }

  colors: string = 'typeColors';

  convertStringToNumber(value: number): string | number {
    if (value < 10) {
      return '0' + value; 
    }
    return value;
  }

  pokemonType(pokemon: IPokemon): string {
    return pokemon.types[0].type.name;
  }
}