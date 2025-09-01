const Filme = require('./Filme');
const Cliente = require('./Cliente');
const Locadora = require('./Locadora');

describe('Locadora - Testes Positivos', () => {
  let locadora;
  beforeEach(() => {
    locadora = new Locadora();
    locadora.cadastrarFilme(new Filme(1, 'Matrix', 'Ação', 1999));
    locadora.cadastrarFilme(new Filme(2, 'Toy Story', 'Animação', 1995));
    locadora.cadastrarCliente(new Cliente(1, 'João'));
    locadora.cadastrarCliente(new Cliente(2, 'Maria'));
  });

  test('Cadastrar filme', () => {
    locadora.cadastrarFilme(new Filme(3, 'Avatar', 'Aventura', 2009));
    expect(locadora.filmes.length).toBe(3);
  });

  test('Cadastrar cliente', () => {
    locadora.cadastrarCliente(new Cliente(3, 'Pedro'));
    expect(locadora.clientes.length).toBe(3);
  });

  test('Alugar filme disponível', () => {
    const msg = locadora.alugarFilme(1, 1);
    expect(msg).toMatch(/alugado/);
    expect(locadora.filmes[0].disponivel).toBe(false);
  });

  test('Devolver filme alugado', () => {
    locadora.alugarFilme(1, 1);
    const msg = locadora.devolverFilme(1, 1);
    expect(msg).toMatch(/devolvido/);
    expect(locadora.filmes[0].disponivel).toBe(true);
  });

  test('Listar filmes retorna array', () => {
    expect(Array.isArray(locadora.listarFilmes())).toBe(true);
  });

  test('Filme cadastrado tem propriedades corretas', () => {
    const filme = locadora.filmes[0];
    expect(filme).toHaveProperty('titulo', 'Matrix');
    expect(filme).toHaveProperty('disponivel', true);
  });

  test('Cliente cadastrado tem propriedades corretas', () => {
    const cliente = locadora.clientes[0];
    expect(cliente).toHaveProperty('nome', 'João');
    expect(cliente.filmesAlugados.length).toBe(0);
  });

  test('Alugar e devolver filme atualiza lista do cliente', () => {
    locadora.alugarFilme(1, 1);
    expect(locadora.clientes[0].filmesAlugados.length).toBe(1);
    locadora.devolverFilme(1, 1);
    expect(locadora.clientes[0].filmesAlugados.length).toBe(0);
  });

  test('Listar filmes mostra disponibilidade correta', () => {
    locadora.alugarFilme(1, 1);
    const filmes = locadora.listarFilmes();
    expect(filmes[0].disponivel).toBe(false);
    locadora.devolverFilme(1, 1);
    expect(locadora.listarFilmes()[0].disponivel).toBe(true);
  });
});

describe('Locadora - Testes Negativos', () => {
  let locadora;
  beforeEach(() => {
    locadora = new Locadora();
    locadora.cadastrarFilme(new Filme(1, 'Matrix', 'Ação', 1999));
    locadora.cadastrarCliente(new Cliente(1, 'João'));
  });

  test('Alugar filme inexistente', () => {
    const msg = locadora.alugarFilme(1, 99);
    expect(msg).toMatch(/indisponível/);
  });

  test('Alugar filme já alugado', () => {
    locadora.alugarFilme(1, 1);
    const msg = locadora.alugarFilme(2, 1);
    expect(msg).toMatch(/indisponível/);
  });

  test('Alugar filme para cliente inexistente', () => {
    const msg = locadora.alugarFilme(99, 1);
    expect(msg).toMatch(/indisponível/);
  });

  test('Devolver filme não alugado', () => {
    const msg = locadora.devolverFilme(1, 1);
    expect(msg).toMatch(/não alugado/);
  });

  test('Devolver filme para cliente inexistente', () => {
    const msg = locadora.devolverFilme(99, 1);
    expect(msg).toMatch(/não alugado/);
  });

  test('Devolver filme inexistente', () => {
    const msg = locadora.devolverFilme(1, 99);
    expect(msg).toMatch(/não alugado/);
  });

  test('Cadastrar filme com id repetido', () => {
    locadora.cadastrarFilme(new Filme(1, 'Outro', 'Drama', 2000));
    expect(locadora.filmes.length).toBe(2);
  });

  test('Cadastrar cliente com id repetido', () => {
    locadora.cadastrarCliente(new Cliente(1, 'Outro'));
    expect(locadora.clientes.length).toBe(2);
  });

  test('Listar filmes sem filmes cadastrados', () => {
    const loc = new Locadora();
    expect(loc.listarFilmes().length).toBe(0);
  });

  test('Alugar filme sem clientes cadastrados', () => {
    const loc = new Locadora();
    loc.cadastrarFilme(new Filme(1, 'Matrix', 'Ação', 1999));
    const msg = loc.alugarFilme(1, 1);
    expect(msg).toMatch(/indisponível/);
  });
});
