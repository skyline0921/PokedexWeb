import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IPokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  loading = false;
  pokemons: IPokemon[] = [];
  pokemonsBackup: IPokemon[] = [];
  showClearIcon = false;

  filter_form = this.fb.group({
    search: [''],
  });

  ngOnInit(): void {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    this.http.get<IPokemon>(url).subscribe({
      next: (value: any) => {
        console.log(value);
        value.results.forEach((el: { name: string; url: string }) => {
          this.getPokemonById(el.name);
        });
      },
    });

    console.log(this.pokemons);

      this.filter_form.get('search')?.valueChanges.subscribe((value) => {
      this.showClearIcon = value !== '';
    });
  }

  searchSubmitHandler() {
    const search = this.filter_form.get('search')?.value || '';
    console.log(search);

    if (search == '') {
      this.pokemons = this.pokemonsBackup;
    } else {
      this.pokemons = this.pokemonsBackup.filter((el) => el.name.includes(search));
    }
    console.log(this.pokemons);
  }

  clearSearch() {
    this.filter_form.get('search')?.setValue('');
    this.pokemons = this.pokemonsBackup;
    this.showClearIcon = false;
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
    return list.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  }
}