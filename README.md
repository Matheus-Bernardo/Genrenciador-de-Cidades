
# Sistema de Locadora de Filmes

Projeto Node.js orientado a objetos para controle de uma locadora de filmes. Permite cadastrar filmes e clientes, alugar e devolver filmes, e listar o catálogo, tudo via interação no terminal.

## Tecnologias Utilizadas
- Node.js
- Jest (para testes unitários)

## Funcionalidades
- Cadastrar filmes
- Cadastrar clientes
- Alugar filmes
- Devolver filmes
- Listar filmes

## Estrutura do Projeto
```
Genrenciador-de-Cidades/
├── src/
│   ├── Filme.js         # Classe Filme
│   ├── Cliente.js       # Classe Cliente
│   ├── Locadora.js      # Classe Locadora
│   ├── index.js         # Ponto de entrada interativo
│   └── locadora.test.js # Testes unitários
├── package.json         # Dependências e scripts
└── README.md            # Documentação
```

## Como executar
1. Instale as dependências:
   ```powershell
   npm install
   ```
2. Execute o sistema interativo:
   ```powershell
   node src/index.js
   ```
   Siga o menu apresentado no terminal para interagir com o sistema.


## Testes Unitários
Os testes utilizam o Jest e cobrem cenários positivos e negativos.

1. Instale o Jest:
   ```powershell
   npm install --save-dev jest
   ```
2. Adicione ao seu `package.json`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```
3. Execute os testes:
   ```powershell
   npm test
   ```

## Situação dos Testes Antes do PR

Antes da realização do Pull Request (PR) defeituoso, todos os testes estavam passando corretamente, conforme imagem abaixo:

![Testes OK](src/testesOK.png)

Essa evidência garante que o sistema estava íntegro e funcional antes da introdução de novas alterações pelo PR.

## Situação dos Testes Após o PR Defeituoso

Após a realização do Pull Request (PR) defeituoso, alguns testes passaram a falhar, conforme imagem abaixo:

![Testes NOK](src/testesNOK.png)

Essa evidência demonstra que o PR introduziu problemas no sistema, tornando-o inconsistente e indicando a necessidade de correção das alterações realizadas.

## Resolução de Conflitos

Durante o desenvolvimento, houve um conflito relacionado à alteração de uma query SQL feita pelo colaborador Matheus. Para resolver o conflito, utilizei a plataforma web do GitHub, seguindo os passos abaixo:

1. **Identificação do conflito:** Ocorreu ao tentar realizar o merge entre a branch base e a branch com as alterações do Henrique.
2. **Acesso à plataforma web do GitHub:** Naveguei até o repositório e visualizei o aviso de conflito.
3. **Resolução manual:** Editei o arquivo diretamente pelo editor do GitHub, mantendo os nomes e a estrutura da branch base conforme necessário.
4. **Finalização do merge:** Após resolver os conflitos, confirmei as alterações e realizei o merge das branches.

Esse procedimento garantiu que as alterações fossem integradas corretamente, mantendo a integridade do projeto e a colaboração entre os membros da equipe.

## Autor
Projeto desenvolvido por Matheus e colaboradores do INATEL.
