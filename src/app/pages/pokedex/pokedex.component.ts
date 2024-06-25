import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  loading = false;

  pokemons: any[] = [];
  pokemonsBackup: any[] = [];

  filter_form = this.fb.group({
    search: [''],
  });

  search = '';

  ngOnInit(): void {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    this.http.get(url).subscribe({
      next: (value: any) => {
        value.results.forEach((el: { name: string; url: string }) => {
          this.getPokemonById(el.name);
        });
      },
    });

    console.log(this.pokemons);
  }

  searchSubmitHandler() {
    const search = this.filter_form.get('search')?.value;
    console.log(search);

    if( search =='') {
      this.pokemons = this.pokemonsBackup
    }
    else{
      this.pokemons = this.pokemonsBackup.filter((el) => el.name.includes(search))
    }
    console.log(this.pokemons);
    

    // if search == '' this.pokemons = backup
    // else filtro  pokemons.name == search
  
  }

  getPokemonById(name: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    this.http.get(url).subscribe({
      next: (pok) => {
        this.pokemonsBackup.push(pok);
        this.pokemons.push(pok);
      },
    });
  }
}
