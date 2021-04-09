const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
      return res.render("profile", { profile: await Profile.get() })
    },

    async update(req, res) {
      //req.body para pegar os dados
      const data = req.body
      //semanas no ano(52), total sem férias
      const weeksPerYear = 52
      const weeksPerMonth = ( weeksPerYear - data["vacation-per-year"]) / 12

      //horas por semana
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
      //total horas mes
      const monthlyTotalHours = weekTotalHours * weeksPerMonth
      //valor da Hora
      const valueHour = data["monthly-budget"] / monthlyTotalHours
    
      const profile = await Profile.get()
      
      await Profile.update({ 
        ...profile,
        ...req.body,
        "value-hour": valueHour
      })
  
      return res.redirect('/profile')
    }
  }