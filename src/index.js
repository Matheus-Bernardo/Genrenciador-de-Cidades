
const readline = require('readline');
const Filme = require('./Filme');
const Cliente = require('./Cliente');
const Locadora = require('./Locadora');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const locadora = new Locadora();

function menu() {
	console.log('\n--- Locadora de Filmes ---');
	console.log('1. Cadastrar Filme');
	console.log('2. Cadastrar Cliente');
	console.log('3. Alugar Filme');
	console.log('4. Devolver Filme');
	console.log('5. Listar Filmes');
	console.log('0. Sair');
	rl.question('Escolha uma opção: ', opcao => {
		switch (opcao) {
			case '1':
				cadastrarFilme();
				break;
			case '2':
				cadastrarCliente();
				break;
			case '3':
				alugarFilme();
				break;
			case '4':
				devolverFilme();
				break;
			case '5':
				listarFilmes();
				break;
			case '0':
				rl.close();
				break;
			default:
				console.log('Opção inválida!');
				menu();
		}
	});
}

function cadastrarFilme() {
	print('Zoei')
}

function cadastrarCliente() {
	rl.question('ID do cliente: ', id => {
		rl.question('Nome: ', nome => {
			locadora.cadastrarCliente(new Cliente(Number(id), nome));
			console.log('Cliente cadastrado com sucesso!');
			menu();
		});
	});
}

function alugarFilme() {
	rl.question('ID do cliente: ', clienteId => {
		rl.question('ID do filme: ', filmeId => {
			const msg = locadora.alugarFilme(Number(clienteId), Number(filmeId));
			console.log(msg);
			menu();
		});
	});
}

function devolverFilme() {
	rl.question('ID do cliente: ', clienteId => {
		rl.question('ID do filme: ', filmeId => {
			const msg = locadora.devolverFilme(Number(clienteId), Number(filmeId));
			console.log(msg);
			menu();
		});
	});
}

function listarFilmes() {
	const filmes = locadora.listarFilmes();
	console.table(filmes);
	menu();
}

menu();
