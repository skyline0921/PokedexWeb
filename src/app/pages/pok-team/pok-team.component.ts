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

  idsPokemons: number[] = [];
  teamPokemons: any[] = [];
  isActive: boolean = false;
  normalCard: boolean = false;

  ngOnInit() {
    const savedPokemons = localStorage.getItem('pokemonsSaved');
    if (savedPokemons) {
      this.teamPokemons = JSON.parse(savedPokemons);
      this.idsPokemons = this.teamPokemons.map((pokemon) => pokemon.index + 1);
    }
  }

  drawPokemon() {
    const count = 6 - this.teamPokemons.length; 
    for (let index = 0; index < count; index++) {
      const numberOfPoke = Math.floor(Math.random() * (151 - 1 + 1)) + 1;

      if ((this.idsPokemons.filter((el) => el == numberOfPoke).length > 0)) {
        index--;
      } else {
        if (this.idsPokemons.length == 6) {
          return;
        }

        this.idsPokemons.push(numberOfPoke);
      }
    }
    console.log(this.idsPokemons);

    this.idsPokemons.forEach((id) => {
      this.getDetailPokemon(id);
    });

    console.log(this.teamPokemons);
  }

  getDetailPokemon(id: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    this.http.get(url).subscribe({
      next: (value: any) => {
        console.log(value);

        if (this.teamPokemons.filter((el) => el.index == id - 1).length > 0) return;
        
        this.teamPokemons.push({ index: id - 1, detail: value });
      },
    });
  }

  clearAndDrawNewPokemon() {
    this.drawPokemon();
    this.isActive = false;
  }

  savePoks() {
    localStorage.setItem('pokemonsSaved', JSON.stringify(this.teamPokemons));
    this.notifierService.notify('success', 'Team pokemon saved');
    this.captureScreen();
  }

  deletePoks() {
    this.idsPokemons = [];
    this.teamPokemons = [];
    localStorage.removeItem('pokemonsSaved');
  }

  captureScreen() {
    const element = document.getElementById('team-container');
    if (element) {
      setTimeout(() => {
        html2canvas(element)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/jpg');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'team-screenshot.jpg';
            link.click();
          })
          .catch((error) => {
            this.notifierService.notify('error', 'Failed to capture screenshot');
          });
      }, 1000);
    } else {
      this.notifierService.notify('error', 'Element not found for screenshot');
    }
  }

  editTeam() {
    this.isActive = true;
    this.normalCard = true;
  }

  removePokemon(index: number) {
    this.teamPokemons.splice(index, 1);
    this.idsPokemons.splice(index, 1);
  }
}
