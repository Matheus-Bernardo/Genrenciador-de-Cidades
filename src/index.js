const db = require("./db");

db.query("SELECT NOW() AS dataAtual", (err, results) => {
  if (err) {
    console.error("Erro na consulta:", err);
    return;
  }
  console.log("Resultado:", results);
});



//qualquer coisa só pra simular o conflito

for(i=0;i<10;i++){
    print(i);
}