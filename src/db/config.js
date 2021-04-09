const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

//open do sqlite precisa de uma arrow function pra rodar
//abrindo a conexão com o banco usando o open do sqlite
module.exports = () => 
  open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });