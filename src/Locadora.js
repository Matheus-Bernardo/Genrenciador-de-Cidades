const Filme = require('./Filme');
const Cliente = require('./Cliente');

class Locadora {
  constructor() {
    this.filmes = [];
    this.clientes = [];
  }

  cadastrarFilme(filme) {
    this.filmes.push(filme);
  }

  cadastrarCliente(cliente) {
    this.clientes.push(cliente);
  }

  alugarFilme(clienteId, filmeId) {
    const cliente = this.clientes.find(c => c.id === clienteId);
    const filme = this.filmes.find(f => f.id === filmeId);

    if (cliente && filme && filme.disponivel) {
      filme.disponivel = false;
      cliente.filmesAlugados.push(filme);
      return `Filme "${filme.titulo}" alugado para ${cliente.nome}.`;
    }
    return 'Filme indisponível ou cliente não encontrado.';
  }

  devolverFilme(clienteId, filmeId) {
    const cliente = this.clientes.find(c => c.id === clienteId);
    const filme = this.filmes.find(f => f.id === filmeId);

    if (cliente && filme && cliente.filmesAlugados.includes(filme)) {
      filme.disponivel = true;
      cliente.filmesAlugados = cliente.filmesAlugados.filter(f => f.id !== filmeId);
      return `Filme "${filme.titulo}" devolvido por ${cliente.nome}.`;
    }
    return 'Filme não alugado por este cliente.';
  }

  listarFilmes() {
    return this.filmes.map(f => ({
      id: f.id,
      titulo: f.titulo,
      disponivel: f.disponivel
    }));
  }
}

module.exports = Locadora;
