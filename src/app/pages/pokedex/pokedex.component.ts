import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IPokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  loading = false;

  pokemons: IPokemon[] = [];
  pokemonsBackup: IPokemon[] = [];

  filter_form = this.fb.group({
    search: [''],
  });

  search = '';

  ngOnInit(): void {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    this.http.get<IPokemon>(url).subscribe({
      next: (value: any) => {
        console.log(value)
        value.results.forEach((el: { name: string; url: string }) => {
          this.getPokemonById(el.name);
        });
      },
    });

    console.log(this.pokemons);
  }

  searchSubmitHandler() {
    const search = this.filter_form.get('search')?.value || '';
    console.log(search);

    if( search == '') {
      this.pokemons = this.pokemonsBackup
    }
    else{
      this.pokemons = this.pokemonsBackup.filter((el) => el.name.includes(search))
    }
    console.log(this.pokemons);
  
  }

  getPokemonById(name: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    this.http.get(url).subscribe({
      next: (pok: IPokemon | any) => {
        this.pokemonsBackup.push(pok);
        this.pokemons.push(pok);
        this.pokemons = this.orderList(this.pokemons);
      },
    });
  }

  orderList(list: any[]) {
    return list.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }


}
