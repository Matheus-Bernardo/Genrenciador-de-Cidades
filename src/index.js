const db = require("./db");

db.query("SELECT NOW() AS dataAtual", (err, results) => {
  if (err) {
    console.error("Erro na consulta:", err);
    return;
  }
  console.log("Resultado:", results);
});
