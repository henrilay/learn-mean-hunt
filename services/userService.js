var getConnection = require('./dbService.js');
var ObjectID = require('mongodb').ObjectID
const COLLECTION_ATTEMPTS = require('./attemptService.js').COLLECTION_ATTEMPTS
const COLLECTION_USERS = 'users'
const DEFAULT_NAME = 'Chuck'

const userProfile = {
	name: DEFAULT_NAME,
	score: 0
}

module.exports.getUser = (userId) => {
	return new Promise((resolve, reject) => {
		getConnection.then((db) => {
			db.collection(COLLECTION_USERS)
				.findOne({_id: ObjectID(userId)})
				.then(resolve)
				.catch(reject)
		})
	})
}

module.exports.createUserProfile = () => {
	return new Promise((resolve, reject) => {
		getConnection.then((db) => {
			db.collection(COLLECTION_USERS)
				.insertOne(userProfile)
				.then((r) => {
					resolve(userProfile)
				})
				.catch(reject)
		})
	})
}

module.exports.setUserName = (userId, newName) => {
	return new Promise((resolve, reject) => {
		getConnection.then((db) => {
			db.collection(COLLECTION_USERS).updateOne({_id: ObjectID(userId)}, { $set: {name: newName} }).then(resolve)
		})
	})
}

module.exports.incScore = (userId, score) => {
	return new Promise((resolve, reject) => {
		getConnection.then((db) => {
			db.collection(COLLECTION_USERS).updateOne({_id: ObjectID(userId)}, { $inc: {score: score} }).then(resolve)
		})
	})
}

module.exports.getOverallAverageScore = () => {
	return new Promise((resolve, reject) => {
		getConnection.then((db) => {
			db.collection(COLLECTION_USERS).count().then((nbUsers) => {
				db.collection(COLLECTION_USERS)
					.aggregate([
						{ $group: { _id: null, total: { $sum: '$score' } } },
						{ $project: {
							total: 1,
							avgScore: { $divide: ['$total', nbUsers] }
						} }
					])
					.toArray()
					.then((avgScore) => {
						resolve({avgScore: avgScore[0].avgScore})
					})
			})
		})
	})
}