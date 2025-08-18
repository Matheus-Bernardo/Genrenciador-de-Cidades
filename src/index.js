const db = require("./db");

db.query("SELECT * FROM CIDADES", (err, results) => {
  if (err) {
    console.error("Erro na consulta:", err);
    return;
  }
  console.log("Resultado:", results);
});
