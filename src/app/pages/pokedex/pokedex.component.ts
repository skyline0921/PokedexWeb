import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {
  constructor(private http: HttpClient) {}

  pokemons: any

  ngOnInit(): void {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151'
    this.http.get(url).subscribe({
    next: ((value: any) => {
      this.pokemons = value;
    })
    })
  }
}
