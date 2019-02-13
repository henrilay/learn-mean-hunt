var getConnection = require('./dbService.js');
var ObjectID = require('mongodb').ObjectID

const COLLECTION_ATTEMPTS = 'attempts'
module.exports.COLLECTION_ATTEMPTS = COLLECTION_ATTEMPTS

module.exports.saveAttempt = (userId, capture, animal) => {
	return new Promise((resolve, reject) => {
		let attempt = {
			userId: ObjectID(userId),
			date: new Date(),
			type: animal.type,
			name: animal.name,
			outcome: capture
		}
		getConnection.then((db) => {
			db.collection(COLLECTION_ATTEMPTS).insertOne(attempt).then(resolve)
		})
	})
}

module.exports.getAttemptsList = (userId) => {
	const NOW = Date.now()
	const ONE_HOUR = 60*60*1000
	return new Promise((resolve, reject) => {
		getConnection.then((db) => {
			db.collection(COLLECTION_ATTEMPTS)
				.aggregate([
					{ $match: { 
						userId: ObjectID(userId),
						date: { $gte: new Date(NOW - ONE_HOUR) } 
					} },
					{ $sort: { date: -1} },
					{ $limit: 100 },
					{ $project: {
						_id: 0,
						userId: 1,
						date: 1,
						type: 1,
						name: 1,
						outcome: 1
					} }
				])
				.toArray()
				.then(resolve)
		})
	})
}

module.exports.getMyStats = (userId) => {
	return new Promise((resolve, reject) => {
		getConnection.then((db) => {
			db.collection(COLLECTION_ATTEMPTS)
				.aggregate([
					{ $match: { 
						userId: ObjectID(userId)
					} },
					{ $group: {
						_id: { name: '$name' },
						seen: { $sum: 1 },
						capture: {
							$sum: {
								$cond: {
									if: { $eq: ['$outcome', true] },
									then: 1,
									else: 0
								}
							}
						}
					} }
				])
				.toArray()
				.then(resolve)
		})
	})
}