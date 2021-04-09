const Database = require('./config');

const initDb = {
  // função async pra garantir que o JS aguarde o SQL terminar
  async init(){

    //inicia a conexão com o banco de dados
    const db = await Database();
    
    await db.exec(`CREATE TABLE profile(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vacation_per_year INT,
      value_hour INT
      )
    `);
    
    await db.exec(`CREATE TABLE jobs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME
      )
    `);

    await db.run(`INSERT INTO profile(
      name,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour
      ) VALUES (
        "Antonio Mendanha",
        "https:////avatars.githubusercontent.com/u/62808682?v=4",
        5000,
        5,
        2,
        4,
        50
      )
    `);

    await db.run(`INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
      ) VALUES (
        "Criação de Home Page",
        2,
        60,
        1617614376018
      )
    `);

    await db.run(`INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
      ) VALUES (
        "Treinamento trilha Discovery - Rocketseat",
        1,
        30,
        1617614376020
      );
    `)

    await db.close();
  }
}

initDb.init();
    

/* 
SQL commands
CREATE TABLE -> criar tabela
CREATE TABLE profile (`id INTEGER PRIMARY KEY AUTOINCREMENT, campo1 TIPO1, campo2 INT, campo3 TEXT, camppo4 INT, etc `)
Tabela SQL sempre tem que ter uma PRIMARY KEY
a criação da tabela é o cabeçalho da planilha

INSERT INTO -> inserir em uma tabela
INSERT INTO () VALUES ();
*/