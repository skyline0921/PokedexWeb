import { Component } from '@angular/core';
import { POKEMONS } from './constants/pokemons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  pokemons = [
    { 
      id: 1,
      name: "Bulbasaur",
      number: "#001",
      types: [
        "grass",
        "poison"
      ]
    },
    { 
      id: 2,
      name: "Ivysaur",
      number: "#002",
      types: [
        "grass",
        "poison"
      ]
    },
    { 
      id: 3,
      name: "Venusaur",
      number: "#003",
      types: [
        "grass",
        "poison"
      ]
    },
    { 
      id: 4,
      name: "Charmander",
      number: "#004",
      types: [
        "fire"
      ]
    },
    { 
      id: 5,
      name: "Charmeleon",
      number: "#005",
      types: [
        "fire"
      ]
    },
    { 
      id: 6,
      name: "Charizard",
      number: "#006",
      types: [
        "fire"
      ]
    },
  ]

  clickBulbasaur() {
    return` 
        <div class="descriptionPok"></div>`
  }
}
