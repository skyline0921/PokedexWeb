import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './constants/pokemons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

 pokemons: any

  ngOnInit() {

  }
}