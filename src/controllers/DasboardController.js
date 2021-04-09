const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports ={
  //criação de função dentro do objeto
  async index(req, res) {
 
    const jobs = await Job.get(); //busca dentro o model/Job
    const profile = await Profile.get(); //busca dentro do model/profile

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    };

    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => { //ajustando os jobs
      const remaining = JobUtils.remainingDays(job);  
      // if ternário (? -> então) (: -> se não)
      const status = remaining <= 0 ? 'done' : 'progress';

      statusCount[status] += 1;  //soma a quantidade de status done e/ou progress
      
      jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;

      return { //reconstrução do objeto, incluindo tudo existente(...)
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    })

    const freeHours = profile['hours-per-day'] - jobTotalHours; 
 
   //se ficar somente jobs não puxa os novos ajustes
    return res.render("index", { 
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours
    })
  }
}