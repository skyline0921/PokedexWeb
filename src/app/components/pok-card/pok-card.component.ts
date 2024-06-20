import { HttpClient } from '@angular/common/http'; // Importa o HttpClient para fazer requisições HTTP.
import { Component, Input, OnInit } from '@angular/core'; // Importa Component para definir o componente, Input para receber dados de um componente pai e OnInit para a inicialização.

interface IPokemon {
  name: string; // Define a interface IPokemon com uma propriedade 'name' do tipo string.
}

@Component({
  selector: 'app-pok-card', // Define o seletor para o componente.
  templateUrl: './pok-card.component.html', // Caminho para o template HTML do componente.
  styleUrls: ['./pok-card.component.scss'] // Caminho para o(s) arquivo(s) de estilo CSS do componente.
})
export class PokCardComponent implements OnInit {
  constructor(private http: HttpClient) {} // Injeta o HttpClient no construtor para fazer requisições HTTP.

  @Input() pokemon!: any; // Recebe um objeto Pokémon do componente pai.
  @Input() index: number = 0; // Recebe um índice do componente pai, com valor padrão 0.

  loading = false;

  ngOnInit(): void {
    this.loading = true;
    // Método chamado quando o componente é inicializado.
    const url = `https://pokeapi.co/api/v2/pokemon/${this.pokemon.name}`; // Cria a URL para buscar dados detalhados do Pokémon usando o nome do Pokémon.
    this.http.get(url).subscribe({
      // Usa HttpClient para fazer uma requisição GET para a URL.
      next: (value: any) => {
        // No retorno bem-sucedido (next), atualiza this.pokemon com os dados recebidos da API.
        this.loading = false;
        this.pokemon = value;
      }
    });
  }

  colors: string = 'typeColors'; // Define uma string 'typeColors', presumivelmente usada para estilizar o componente com cores baseadas no tipo do Pokémon.

  convertStringToNumber(value: number): string | number {
    // Método para converter um número em string com dois dígitos.
    if (value < 10) {
      // Se o valor for menor que 10,
      return '0' + value; // Retorna o valor prefixado por '0'.
    }
    return value; // Caso contrário, retorna o valor como está.
  }

  pokemonType(pokemon: any): string {
    // Método para obter o nome do primeiro tipo do Pokémon.
    return pokemon.types[0].type.name; // Retorna o nome do primeiro tipo do Pokémon.
  }
}