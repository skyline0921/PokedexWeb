import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pok-team',
  templateUrl: './pok-team.component.html',
  styleUrls: ['./pok-team.component.scss']
})
export class PokTeamComponent implements OnInit{
  constructor(private http: HttpClient) {}

    ngOnInit() { 
      
    }

    pokemon: any
    sixPokes:number[] = []

    drawPokemon() {
      for (let index = 0; index < 6; index++) {
        const numberOfPoke = Math.floor(Math.random() * (151 - 1 + 1)) + 1;

        if (this.sixPokes.filter(el => el == numberOfPoke).length > 0) {
          index --;
        }
        else{
         
          if(this.sixPokes.length == 6){
            return;
          }

          this.sixPokes.push(numberOfPoke)
        }
      }
      console.log(this.sixPokes);     

        /*
      gerar os 6 pokemons de forma aleatoria; feito 
      armazenar em um array; feito
      permitir o click só uma vez; feito
      formar o card onde apareça os 6 pokemons na tela pok-team;
      opção de salvar, regerar ou excluir.
      */

      this.callRequest(1)
    }

    callRequest(id:number) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`
      this.http.get(url).subscribe({
        next: ((value: any) => {
          this.pokemon = value;

          this.sixPokes
        })

      }
    )}
  }