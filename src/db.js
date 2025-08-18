const mysql = require("mysql2");

// Configuração da conexão
const connection = mysql.createConnection({
  host: "localhost", 
  user: "root",      
  password: "654321",
  database: "CidadesBrs"
});

// Conectar ao banco
connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conexão estabelecida com sucesso!");
});


module.exports = connection;
