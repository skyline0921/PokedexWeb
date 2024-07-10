import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IPokemon } from 'src/app/models/pokemon';
@Component({
  selector: 'app-pok-card',
  templateUrl: './pok-card.component.html',
  styleUrls: ['./pok-card.component.scss'],
})
export class PokCardComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationStart) {
        this.isPokeball = router.url === '/generation'
      }
    });
  }

  @Input() pokemon: IPokemon = {} as IPokemon;
  @Input() index: number = 0;
  @Input() isGifty = true;
  teamPokemons: { id: number; detail: IPokemon | undefined }[] = [];
  isPokeball = false;
  loading = false;

  ngOnInit(): void { 
    this.isPokeball = this.router.url === '/generation'
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

  addPok(event: Event) {
    event.stopPropagation();

    const savedPokemons = localStorage.getItem('pokemonsSaved');

    if (savedPokemons) {
      this.teamPokemons = JSON.parse(savedPokemons);
    }
    if (
      this.teamPokemons.filter((el) => el.detail?.name == this.pokemon?.name)
        .length > 0
    ) {
      this.notifierService.notify(
        'error',
        'This pokemon has already been added'
      );
    } else {
      this.notifierService.notify('success', 'This pokemon added');
      if (this.teamPokemons.length == 6) {
        this.notifierService.notify('error', 'Full pokedex');
        return;
      }

      this.teamPokemons.push({
        id: (this.pokemon?.id || 0) - 1,
        detail: this.pokemon,
      });
    }

    localStorage.setItem('pokemonsSaved', JSON.stringify(this.teamPokemons));
  }
}
