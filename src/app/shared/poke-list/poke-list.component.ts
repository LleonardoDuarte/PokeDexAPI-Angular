import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  private setAllPokemons: any;
  public getAllPokemons: any;
  public apiError: boolean = false;
  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      (res) => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }

  // Aqui é nosso método de filtragem, nesse método eu pego os dados recebidos da nossa getSearch e aplico um filter nos dados dos nossos pokemons, que está armazenado no getAllPokemons, nesse filter eu realizo uma verificação do que está sendo digitado e coloco já o filter nas primeiras palavras com o indexOf, ou seja, conforme voce digita ele ja faz a verificação se algum pokemon tem as letras digitadas, depois disso eu coloco nossa lista de pokemons como o filter.

  // Sobre o setAllPokemons, faz-se necessário criar este método private para que quando apagarmos os dados do input ele possa retornar ao padrão, nesse caso como o setAllPokemons tem os dados dos pokemons,quando nos realizamos um filter dele ao invés de atualizarmos ele mesmo nos colocamos o filter no getAllPokemons, assim os valores do setAllPokemons se mantem os mesmos e o getAllPokemons que fica com os dados digitados do input e ele que irá filtrar, quando apagamos os dados digitados como o setAllPokemons nao foi alterado os pokemons voltam a lista normalmente.
  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });
    this.getAllPokemons = filter;
  }
}
