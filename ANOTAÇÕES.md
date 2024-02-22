# Instalar uma versão especifica do angular

npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@1.4.1

# Anotações gerais.

-Para mais dinamismo na página o professor fez as seguintes alterações:

-deletou os arquivos app.component.html e app.component.scss

-no arquivo app.component.ts apagou o templateURL e o styleURLs

-criou um template e chamou a rota <router-outlet></router-outlet>

# ngOnInit

-Para chamar o ngOnInit no export devemos colocar um implements OnInit e importar ele pelo mesmo local de import do componente. apos isso ja podemos chamar ele dentro do export

-O void caracteriza que nao terá nenhum retorno

# ngOnChange

- Executado sempre que um valor de um controle de entrada dentro do componente é alterado

-O ngOnChanges só é invocado quando há alteração através do @input(), sem ele nao irá funcionar

# ngDoCheck() e filhos:

- ngDoCheck(): Sempre que os componentes inicializam e verificam os valores ele é chamado

--- # ngAfterContentInit(): Invocado quando se tem a realização de alguma projeção de conteudo, apertar um botão por exemplo.

--- # ngAfterContentChecked(): Invocado quando o contentInit detecta alteração

--- # ngAfterViewInit(): Invocado quando todos os componentes forem visualizados

---# ngAfterViewChecked(): Invocado quando todos os componentes ja forem verificados pelo viewInit

# ngOnDestroy()

- É usado sempre que destruimos algum componente

# @input()

- O input sempre vem antes da declaração da sua variavel e ele serve para que voce consiga realizar mudanças dos dados em outros arquivos com esta mesma variavel, entao se eu declaro por exemplo uma variavel title com nome "ola", porem quero alterar direto pelo seletor, obrigatoriamente eu preciso colocar @input() antes da variavel, se nao o angular nao ira realizar a alteração desejada.

# Data Binding

- Data Binding basicamente são formas de se trabalhar com dados e exibilos atraves de algumas opções

--- interpolation {{}}

--- Property binding <button [disabled]='disabled'>Button<button> || <img [src]='itemImageUrl'>

--- Event Binding <button (click)='calc()'>Button<button>

--- two way data binding <input [(ngModel)]='nome'> Este modelo escuta e executa ao mesmo tempo

informação importante, para usar o two way bindin deve-se importar o formsModule no app.module

# Diretivas de atributo

Alteram a aparencia ou comportamento de um elemento, componente ou diretiva

- ngClass: adiciona e remove um conjunto de classes css

- ngStyle: adiciona ou remove um conjnto de estilos HTML

- ngModel: adiciona vinculação de dados bidirecionais a um elemento de formulário HTML

# Diretivas estruturais

Moldam ou remodelam a estrutura do DOM, adicionando, removendo e manipulando os elementos do host aos quais estão anexados

- ngIf: condicionalmente cria ou descarta visualização de modelo

- ngFor: repete um nó para cada item de uma lista

- ngSwitch: um conjunto de diretivas que alternam entre visões alternadas.

- ngSwitchDefault: Deixa uma mensagem padrao que pode ser o aviso do que digitar, um erro, etc...

# Diretivas de atributos

- ngClass: adiciona classe css ao componente HTML, pode ser usado para fazer validações também ex:<p [ngClass]="{ active: true, disabled: false }">texto</p>

- ngStyle: assim como o ng class adiciona classe ao componente css e pode fazer validações.

- ngModule: A diretiva [(ngModel)] é uma diretiva bidirecional que utiliza-se em input de formulario, para usar este model é necessario dentro do arquivo app.module.ts realizar o import do FormsModule e coloca-lo dentro dos imports, caso contrario o ngmodel ira acusar erro, segue import:import { FormsModule } from '@angular/forms';

- ng-template: O ng template serve para que possamos encapsular dados para realizar validações atraves de ng if e isso ser realizado antes do carregamento da DOM

- ng-content:Serve para poder mostrar o conteudo HTML adicionado direto no APP component sem precisar de um seletor de componente, alem disso voce pode direcionar o conteudo para onde voce quiser.

- pipes: O pipe é responsavel por pegar as informações das interpolations e poder modificalas, para usar o pipe basta voce dentro da interpolation ou dentro da tag HTML usar a barra | que representa o pipe

# Module (@ngModule)

- Module é um mecanismo para agrupar components,diretivas,pipes e serviços relacionados,de forma a combinar com outros modulos para criar um app

- Para conseguirmos realizar o uso dos componentes dentro de um novo modulo devemos primeiro importar o componente no modulo que voce quer e colocar este componente no declarations e criar um exports e colocar la tambem, exemplo:

declarations:[component],
exports:[component],

feito isso voce vai ate o app module e importa o seu module, importando ele voce vai nos imports e declara ele lá, apartir dai voce ja pode usar o seletor no app component.

# Comunicação entre componentes

- A comunicação entre componentes basicamente usa o @input e @output , como os nomes sugerem o input serve para a entrada de dados e o output para a saida, em uma cascata de cima para baixo as informaçoes dos componentes pais sao passadas aos componentes filhos atraves do input, quando um componente filho deseja voltar informaçoes acima usa-se o output

# Service

- Services são úteis para salvar regras de negócio, pegar informações advindas do servidor (API) (seja por get, post, put, etc...), atualizar e mandar informações a outros componentes.

- Nas versões mais atuais do angular o service ja vem com o @injectable como 'root' entao ele ja funcionará em toda aplicação, sem necessidade de importar nada.

- Para fazer a injeção de dependencia do nosso service em outro componente dentro do constructor no valor devemos colocar uma variavel publica ou privada dar um nome e chamar o nome do service, exemplo: Constructor(private foodListService: FoodListService){}, alem disso importar o service nos imports.

- Para chamar o método que contem as informaçoes da lista no nosso service no meu componente, primeiro devo criar uma variavel tipada (public foodList: Array<string> = [];) depois no ngOnInit eu chamo essa variavel dizendo que ela é = ao service.nomedométodo ( this.foodList = this.foodListService.foodList();) apartir dai posso usar o método no HTML para pegar as informaçoes.

# Comunicação entre componentes sem uso de input e output (usando services)

- Para que haja a comunicação entre dois componentes nos precisamos utilizar a injeção de dependencia no componente e criar a função desejada dentro do nosso service.

# Subscribe

- Subscribe é uma forma e enviar dados atraves de inscrição, voce emite os dados atraves de um eventEmitter no seu server e pode receber os dados atraves de inscrição no seu componente dentro do ngOnInit., exemplo:

  <!-- Server -->

  public emitEvent = new EventEmitter();

  public foodListAlert(value: string) {
  return this.emitEvent.emit(value);
  }

  <!-- Component/ngOnInit -->

      this.foodListService.emitEvent.subscribe(
        (res) => alert(`Você adicionou o item ${res}`)

  );

# Fake Server e Requisição get

- É possivel realizar a criação de um server fake para testes e outras coisas sem precisar necessariamente de criar um teste, para isso deve-se ter instalado no computador o json-server (npm install -g json-server) e depois depois na mesma hierarquia do projeto deve-se criar um arquivo db.json e apartir dai colocar os dados lá.

- Após colocar os dados para iniciar o servidor devemos estar na pasta do arquivo json e digitar no terminal json-server --watch db.json onde ele irá startar o server para que seja usado e poder pegarmos os dados

- Para que nos possamos realizar a requisição API na nossa API fake primeiro dentro do seu módulo onde contem os componentes que voce irá usar os dados da API deve-se importar o httpClientModule e colocar nos imports, apartir dai ja podemos usar.

- Para usar os dados do server fake agora que ja temos o import no module, iremos no nosso service e criaremos primeiro uma variavel private como url (private url:string = 'http://localhost:3000'), depois criaremos uma injeção de dependencia no constructor trazendo o import do httpClient (private:http = httpClient) e apartir dai chamar p método para uso dos dados.
  <!-- Exemplo: -->

  public foodList(): Observable<Array<FoodList>> {
  return this.http.get<Array<FoodList>>(`${this.url}list-food`).pipe(
  (res) => res,
  (error) => error
  );
  }

- Vale lembrar que é necessario tipar a nossa requisição, para isso chamamos o Observable para ficar "escutando" a requisição e depois atraves dos <> devemos criar uma tipagem a parte com os dados que queremos trazer, também vale comentar que o pipe seria o "qual o proximo passo".

- Na chamada da nossa requisição via component teremos que mudar tanto a variavel criada quanto o método de chamada, segue os exemplos

<!-- Variavel -->

public foodList: Array<FoodList> = []; aqui tiramos o array como string e trazemos nossa tipagem ou qualquer coisa.

  <!-- ngOnInit -->

      this.foodListService.foodList().subscribe(
      (res) => (this.foodList = res),
      (error) => error
    );

# Requisição Post

- Exemplo de requisição com post:

  public foodListAdd(value: string): Observable<FoodList> {
  return this.http
  .post<FoodList>(`${this.url}list-food`, { nome: value })
  .pipe(
  (res) => res,
  (error) => error
  );
  }

  - Vale lembrar que para que esta requisição funcione é necessario que o recebedor da informação tenha o subscribe() senão não irá funcionar

  # Requisição Put

  Exemplo de aplicação put via http

  # Requisição Delete

    <!-- Service -->

  public foodListPut(value: string, id: number): Observable<FoodList> {
  return this.http
  .put<FoodList>(`${this.url}list-food/${id}`, { nome: value })
  .pipe(
  (res) => res,
  (error) => error
  );
  }

    <!-- Component -->

      public foodListPut(value: string, id: number) {
      this.foodListService.foodListPut(value, id).subscribe(
        (res) => console.log(res),
        (error) => error
      );

  }

  - Vale lembrar que a função put está sendo passada como um evento keyup.enter no input do html
  Exemplo de aplicação de delete via http

    <!-- Service -->

  public foodListDelete(id: number): Observable<FoodList> {
  return this.http.delete<FoodList>(`${this.url}list-food/${id}`).pipe(
  (res) => res,
  (error) => error
  );
  }

    <!-- Component -->

  public foodListDelete(id: number) {
  return this.foodListService.foodListDelete(id).subscribe(
  (res) => {
  this.foodList = this.foodList.filter((item) => {
  return id !== item.id;
  });
  },
  (error) => error
  );
  }

  - Vale lembrar que a função put está sendo passada como um evento no botão de delete

  # Formulários (ngForm)

  - O ngForm é uma forma de construção de formulários usando proprio serviço do angular, para usar o ngForm devemos primeiramente importaro formsModule no seu module e usar o ngForm dentro da tag HTML form, ex:
  <form #form ngForm>

  # Reactive Forms

  - Reactive forms é uma outra forma de se trabalhar com formulários no angular, em comparação com o template-drivel-form o reactive forms se mostra mais interessante para uso, principalmenmte para manucanção e tratamento de erros

  - Para começarmos a usar o reactive forms devemos realizar o seu import no app.module e chama-lo no imports.
    import { ReactiveFormsModule } from '@angular/forms';, apartir dai ja se consegue realizar a sua utilização.

  - Para uso do FormBuilder devemos importa-lo dentro do arquivo ts do nosso componente e coloca-lo em injeção de dependecia no constructor
    import { FormBuilder } from '@angular/forms';
    constructor(private fb:FormBuilder) { }

  - Diferente do FormControl no [formGroup] para que consigamos pegar as informaçoes pelas interpolations devemos chamar como se fosse uma requisição, exemplo: {{ cadastroForm.get("firstName")?.value }}, nesse caso a ? serve para realizar uam validação de "se existir exiba, se nao existir nao faça nada", lembrando que sem a ? a aplicação irá se quebrar.

  # Validator

  - Validator são formas de realizar validações nos inputs dos nossos formulários, para usar o validators deve-se importa-lo e usar dentro do seu array de objetos, exemplo:
    <!-- import -->

    import { Validators } from '@angular/forms';

      <!-- array de objetos -->

    public cadastroForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    });

    - No Validator existe algumas iterações que voce coloca nas interpolações, as mais comuns são o .errors (ira mostrar se existe erro no envio), .touched (quando se toca no formulário e sai ele passa para true), dirty(quando se digita alguma coisa ele passa para true)

# Rotas no angular

- Para colocar nossas rotas usamos o arquivo app routing module e usamos um array de objeto com cada rota.

- Sempre na sua página principal onde o path será '' (vazio) deve-se usar o pathMath:'full' para evitar que o angular reinderize coisas a mais, nas proximas páginas não é necessário usar o pathMath.

- A rota coringa é a rota onde qualquer rota que a pessoa digite e nao existe irá direcionar para a rota coringa, normalmente usa-se no path ** para o evidenciamento desta rota, ficaria assim: {path:"**", redirectTo:'404'}, nesse exemplo estou solicitando o redirecionamento para página de erro porém eu posso redirecionar para a home, ou qualquer página que eu queira.

- Para navegação entre páginas usamos o routerlink="valor", vale salientar que como boa prática é importante usar chaves [] para colocar a sua rota pois se tivermos uma rota parametrizada fica facil de poder pegar algo especifico, exemplo:
  <a [routerLink]="['/dashboard']">, vale ressalva que quando queremos usar as chaves [] na rota também temos que usar ela no routerlink assim como exemplo acima.

# Rotas Ativas

- Rotas ativas são ferramentas para mostrar em destaque quando voce estiver na rota especifica, adicionando estilo ao seu componente, para usar rotas ativas usamos [routerLinkActive]="" e [routerlinkActiveOptions]="", basicamente significa "quando minha rota estiver ativa faça isso", exemplo de adição de classes com rotas ativas:

<!-- exemplo de adição de estilização com classe -->

[routerLinkActive]="['active']" nesse caso active muda o background-color e a color

O options é usado quando quero que seja acionado a classe quando apenas exatamente for direcionado para aquela rota especifica, se nao usarmos o options a home sempre irá ter o valor estilizado se estiver usando o o routerLinkActive
[routerlinkActiveOptions]="{exact:true}"

# Rotas Parametrizadas

- Rotas parametrizadas são rotas que usamos para pegar informações a mais como id, username, password por exemplo

- Para criarmos uma rota parametrizada basta colocarmos as informaçoes desejadas por exemplo:
  {path:'/parametrizada/:id/:username'}

- Para usarmos a rota parametrizada com id, username e outras informaçoes precisamos do ActiveRoutes que usaremos como injeção de dependencia no constructor do nosso componente, exemplo:
  constructor(private activeRoute:ActivatedRoute) { }

- Depois de realizar a injeção ai chamamos dentro do ngOnInit nossa incrição, exemplo:
  this.activeRoute.params.subscribe((res) =>
  console.log(res, res.id, res.username))
  Nesse caso acima minha rota tem id e username

<<<<<<< HEAD
  OBS: Para que possamos verificar os valores como res.valor é necessario no arquivo tsconfig.json colocar de true para false o seguinte parametro: "noPropertyAccessFromIndexSignature": false, se ele estiver true voce so conseguirá acessar o valor atraves de um array res.['valor']

- Para acessar a rota com sucesso devemos passar na rota o id e o username exemplo:
  http://localhost:4200/parametrizada/1/leonardoDuarte

  - Para mudança de tela apartir do nosso arquivo TS de um componente devemos realizar a injeção de dependencia importando o Router e depois chamar essa injeção no ngOnInit passando uma rota, segue exemplo abaixo:

    <!-- Constructor -->

    constructor(private router:Router) {}

      <!-- Nesse exemplo especifico foi usado setInterval para demonstrar como chamar a rota -->

    setInterval(() => {
    this.router.navigate(['nomedapagina'])
    }, 5000)

    - A diferença entre usar .navigate() e .navigateByUrl() é que quando usamos apenas navigate nao á reload da página, já com o byUrl existe o reload da página

  # Rotas filhas

  - Como proprio nome diz rotas filhas são rotas que podem ser incrementadas dentro de uma rota já especificada, para iso usamos a opção children após o component e usamos um array de objetos para especificar a proxima rota, exemplo de rotas filhas:

  { path: 'sobre', component: SobreComponent, children:[
  {path: 'contato', component: contatoComponent}
  ] }

  # lazy loading

  - lazy loading é um carregamento tardio de rotas filhas, ele melhora a performance da sua página quanto ao carregamento pois dependendo da quantidade de componentes e rotas filhas que sua página tem pode ficar extremamente pesada, o lazy loading ajuda no direcionamento do carregamento dos componentes, se voce acessar uma página da aplicação o lazy loading carrega apenas aqueles componentes daquela rota, quando voce acessa outra rota filha ele muda, assim nao existe um carregamento total e pesado de toda aplicação

  - Para usar o lazy loading primeiramente é obrigatorio termos um módulo e um arquivo de module para as rotas, pois é apartir do módulo que irá se iniciar seu direcionamento. Lembrando que o lazy loading por trabalhar com rotas filhas ele nao trabalha com forRoot, entao no nosso arquivo routing module devemos sempre prestar atenção no ngModule para usarmos forChild e nao forRoot.

  - Para usar o lazy loading no nosso component root devemos primeiro configurar os componentes dentro do routing que será o lazy loading e depois carregar a seguinte rorta dentro do nosso module root:
    {
    path: 'dashboard',
    loadChildren: () =>
    import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    }, nesse exemplo o dashboard é nosso module que contem os componentes que seráo os filhos.

  - Vale lembrar que isso implica muito em performance, quando voce usa essas rotas filhas com lazy loading estes componentes so são baixados quando a pessoa acessa a rota, entao o carregamento fica a cargo da pessoa acessar ou nao aquela rota.

  # useHash

  - o Hash (#) é usado quando voce quer passar a sua aplicação web para um app, alguns brownsers nao entendem a estratégia de rotas e precisam do uso de hash porem isso hoje em dia é pouco comum. Se voce for construir um app da sua aplicação web usando um sistema antigo como cordova por exemplo talvez voce precisa usar a estratégia de hash.
    Basicamente dentro do seu module routing principal voce adiciona um hash:true, exemplo:
    imports:[RouterModule.forRoot(routes), {useHash:true}]

- Para acessar a rota com sucesso devemos passar na rota o id e o username exemplo:
  http://localhost:4200/parametrizada/1/leonardoDuarte


# Sobre rotas e mudança de página no angular

- Para realizar a mudança de página no angular cria-se uma nova rota no arquivo app routes e o path devera ser o que voce deseja que seja colocado no / e no component devera ser o novo componente, exemplo de duas rotas:
  export const route:Routes = [

{
path:'',
component: HomeComponent
}
{
path: 'chat',
component: PaginaComprasComponent
}
]

- Quando quisermos adicionar a função de mudar de página para um botao por exemplo deve-se criar o evento no botao, no component ts deve-se no constructor importar o router e colocar o caminho no botao, exemplo:
  <button (click)='MudarPagina()'></button>

Constructor(private router:Router){}

public MudarPagina(){
this.router.navigate('PaginasComprasComponent')
}

Apartir dai quando se clicar no botao ele direcionara para a página desejada

# API PokeDex

- 
