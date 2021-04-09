const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

//Habilita o ejs no servidor
server.set('view engine', 'ejs');

//Muda a localização da pasta views pra dentro da SRC
server.set('views', path.join(__dirname, 'views'));

//Habilitar arquivos estáticos, e cria rotas
server.use(express.static("public"));

//Habilitar o req.body
server.use(express.urlencoded({ extended: true }));

// routes
server.use(routes);

// 1 argumento = porta 
server.listen(3000, () => {console.log('conectado com o servidor ')});
