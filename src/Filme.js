class Filme {
  constructor(id, titulo, genero, ano) {
    this.id = id;
    this.titulo = titulo;
    this.genero = genero;
    this.ano = ano;
    this.disponivel = true;
  }
}

module.exports = Filme;
