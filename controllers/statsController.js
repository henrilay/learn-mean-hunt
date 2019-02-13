var userService = require('../services/userService.js')

module.exports.getStats = (req, res, next) => {
	userService.getOverallAverageScore().then((avgScore) => {
		res.send(avgScore)
	})
}