import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pok-card',
  templateUrl: './pok-card.component.html',
  styleUrls: ['./pok-card.component.scss']
})
export class PokCardComponent implements OnInit {
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

  convertStringToNumber(value:number) {
    if(value < 10){
      return "0" + value;
    }
    return value
  }
}