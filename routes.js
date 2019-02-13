var userController = require('./controllers/userController.js')
var huntController = require('./controllers/huntController.js')
var statsController = require('./controllers/statsController.js')

module.exports = (app) => { 
	//get user session
	app.get('/api/profile/me', userController.getSession)
	//update name
	app.post('/api/profile/me', userController.updateUser)
	//get list of animal type
	app.get('/api/species', huntController.getSpecies)
	//capture decision
	app.get('/api/capture/:type', huntController.capture)
	//get overall stats for all users
	app.get('/api/stats', statsController.getStats)
	//get stats for user
	app.get('/api/stats/me', userController.getMyStats)
	//handle 404
	app.use((req, res, next)=>res.status(404).send('Sorry not found!'))
	//handle 500
	app.use((error, req, res, next)=>{
		res.status(500).send('something went wrong: ' + error)
	});
}