module.exports = {
    remainingDays(job) {  //calculo de dias que faltam pra acabar
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    
      const createdDate = new Date(job.created_at); //dia de criação
      const dueDay = createdDate.getDate() + Number(remainingDays); //dia de vencimento
      //obs.: .getDay -> pega dia da semana
      const dueDateInMs = createdDate.setDate(dueDay); //.setDate -> retorna valor em milisegundos
      const timeDiffInMs = dueDateInMs - Date.now(); //salva o prazo em milisegundos
      const dayInMs = 1000 * 60 * 60 * 24; //transforma em dia
      const dayDiff = Math.ceil(timeDiffInMs / dayInMs);
    
      return dayDiff;
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
  };
  