const Database = require('../db/config')

 module.exports = {
  async get(){
    const db = await Database();

    // .all -> puxa todos os jobs do banco
    const jobs = await db.all(`SELECT * FROM jobs`);

    await db.close();

    return jobs.map((job) => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      "created-at": job.created_at
    }));
  },

  async update(updatedJob, jobId){
    const db = await Database()

    await db.run(`UPDATE jobs SET
      name = "${updatedJob.name}",
      daily_hours = ${updatedJob["daily-hours"]},
      total_hours = ${updatedJob["total-hours"]},
      created_at = ${updatedJob.created_at}
      WHERE id = ${jobId}
    `)

    db.run()

    db.close()
  },

  async delete(id){
    const db = await Database()
    // NO SQL o = está significando comparação 
    await db.run(`DELETE FROM jobs WHERE id = ${id}`)

    db.close()
  },

  async create(newJob){
    const db = await Database()

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at 
    ) VALUES (
      "${newJob.name}",
      ${newJob["daily-hours"]},
      ${newJob["total-hours"]},
      ${newJob["created-at"]}
    )`)

    await db.close()

  }
 };
 