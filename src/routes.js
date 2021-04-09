const express = require("express"); //biblioteca para criar servidor
const routes = express.Router(); //para criar rotas
const DashboardController = require('./controllers/DasboardController');
const JobController = require('./controllers/JobController');
const ProfileController = require('./controllers/ProfileController');

routes.get('/', DashboardController.index);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);  //rota POST para salvar os dados do novo job
routes.post('/job/delete/:id', JobController.delete);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);  //rota POST para salvar os dados do novo job
routes.get('/profile', ProfileController.index );
routes.post('/profile', ProfileController.update); //rota POST para atualizar o profile e atualizar valores dos jobs

module.exports =  routes;