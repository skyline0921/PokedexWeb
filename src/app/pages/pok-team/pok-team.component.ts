import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pok-team',
  templateUrl: './pok-team.component.html',
  styleUrls: ['./pok-team.component.scss'],
})
export class PokTeamComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private notifierService: NotifierService
  ) {}

  pokemon: any;
  sixPokes: number[] = [];
  teamPokemons: any[] = [];

  ngOnInit() {
    const savedPokemons = localStorage.getItem('pokemonsSaved');
    if (savedPokemons) {
      this.teamPokemons = JSON.parse(savedPokemons);
      this.sixPokes = this.teamPokemons.map((pokemon) => pokemon.index + 1);
    }
  }

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
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    this.http.get(url).subscribe({
      next: (value: any) => {
        console.log(value);

        this.teamPokemons.push({ index: id - 1, detail: value });
      },
    });
  }

  clearAndDrawNewPokemon() {
    this.sixPokes = [];
    this.teamPokemons = [];
    this.drawPokemon();
  }

  savePoks() {
    localStorage.setItem('pokemonsSaved', JSON.stringify(this.teamPokemons));
    this.notifierService.notify('success', 'Team pokemon saved');
    this.captureScreen();
  }

  deletePoks() {
    this.sixPokes = [];
    this.teamPokemons = [];
    localStorage.removeItem('pokemonsSaved');
  }

  captureScreen() {
    const element = document.getElementById('team-container');
    if (element) {
      html2canvas(element)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = imgData;
          link.download = 'team-screenshot.png';
          link.click();
        })
        .catch((err) => {
          console.error('Failed to capture screenshot:', err);
        });
    } else {
      console.error('Element not found for screenshot');
    }
  }
}
