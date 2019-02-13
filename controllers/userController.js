var userService = require('../services/userService.js')
var attemptService = require('../services/attemptService.js')

module.exports.getSession = (req, res, next) => {
	let session = {
		attemptsList: []
	}

	if( !req.session.user ) {
		//create user profile
		userService.createUserProfile().then((user) => {
			req.session.user = user
			session.user = user
			res.send(session)
		})
	} else {
		//update the session with user from db
		userService.getUser(req.session.user._id).then((user) => {
			session.user = user
			//get the attemptsList for the user
			attemptService.getAttemptsList(req.session.user._id).then((attemptsList) => {
				session.attemptsList = attemptsList
				res.send(session)
			})
		})
	}
}

module.exports.updateUser = (req, res, next) => {
	userService.setUserName(req.session.user._id, req.body.newUser.name).then((user) => {
		req.session.user.name = req.body.newUser.name
		res.send(req.session.user)
	})
}

module.exports.getMyStats = (req, res, next) => {
	attemptService.getMyStats(req.session.user._id).then((myStats) => {
		res.send(myStats)
	})
}