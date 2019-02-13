var userService = require('../services/userService.js')
var attemptService = require('../services/attemptService.js')
var animalService = require('../services/animalService.js')
const PROB_CAPTURE = 0.6

var getRandomArbitrary = (min, max) => {
	return Math.random() * (max - min) + min;
}

var hasCaptured = (prob) => prob <= PROB_CAPTURE
var getAnimal = (type) => {
	return new Promise((resolve, reject) => {
		animalService.getSpeciesAnimals(type).then((animals) => {
			let prob = getRandomArbitrary(0, animals[animals.length-1].probability)
			let animalKey = Object.keys(animals).find(key => animals[key].probability >= prob)
			let animal = animals[animalKey]
			resolve(animal)
		})
	})
}

module.exports.capture = (req, res, next) => {
	let attemptRes = hasCaptured(Math.random())
	getAnimal(req.params.type).then((animal) => {
		attemptService.saveAttempt(req.session.user._id, attemptRes, animal).then((r) => {
			if( attemptRes ) {
				//update user score in db and session
				userService.incScore(req.session.user._id, animal.score).then((r) => {
					req.session.user.score += animal.score
				})
			}
			//return attemptsList
			attemptService.getAttemptsList(req.session.user._id).then((attemptsList) => {
				res.send(attemptsList)
			})
		})
	})
}

module.exports.getSpecies = (req, res, next) => {
	animalService.getSpeciesList().then((list) => {
		res.send(list)
	})
}
