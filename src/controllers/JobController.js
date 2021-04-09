const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
  /* //criação de função dentro do objeto
  async index(req, res) {

    const jobs = await Job.get(); //busca dentro o model/Job
    const profile = await Profile.get(); //busca dentro do model/profile
    const updatedJobs = jobs.map((job) => { //ajustando os jobs
      const remaining = JobUtils.remainingDays(job);  
      // if ternário (? -> então) (: -> se não)
      const status = remaining <= 0 ? "done" : "progress";
      
      return { //reconstrução do objeto, incluindo tudo existente(...)
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    })

    //se ficar somente jobs não puxa os novos ajustes
    return res.render("index", { jobs: updatedJobs })
  }, */

  create(req, res) {
    res.render("job")
  },

  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      "created-at": Date.now() //atribuindo uma nova data
    });

    return res.redirect('/'); //redireciona para a página principal
  },

  async show(req, res) {
    //req.params para visualizar o id
    const jobId = req.params.id;
    const jobs = await Job.get();
    const profile = await Profile.get();

    const job = jobs.find( job => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send('Job not found');
    };

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },
  
  async update(req, res) {
    //req.params para visualizar o id
    const jobId = req.params.id;

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };
    
    await Job.update(updatedJob, jobId);  //Atualiza o data em model/job

    res.redirect('/job/' + jobId)

  },

  async delete(req, res) {
    const  jobId = req.params.id;
    
    await Job.delete(jobId); //delete está rodando no model/Job
    
    return res.redirect('/');
  },
};
