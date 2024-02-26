import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss'],
})
export class PokeSearchComponent implements OnInit {
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  //  aqui foi criado o método para enviar todos os dados do Input, ou seja, tudo que for digitado será enviado atraves desse método
  public search(value: string) {
    this.emmitSearch.emit(value);
  }
}
