var getConnection = require('./dbService.js')
const COLLECTION_ANIMALS = 'animals'

//get a distinct list of species
module.exports.getSpeciesList = () => {
	return new Promise((resolve, reject) => {
		getConnection.then((db) => {
			db.collection(COLLECTION_ANIMALS)
				.aggregate([{ 
					$group: {
						_id: '$type'
					} 
				}])
				.toArray()
				.then((docs) => {
					resolve(docs.map((doc) => doc._id))
				})
				
		})
	})
}

//return a list of animals for the requested specie sorted ascending by probability
module.exports.getSpeciesAnimals = (type) => {
	return new Promise((resolve, reject) => {
		getConnection.then((db) => {
			db.collection(COLLECTION_ANIMALS)
				.find({type: type}, {_id:0})
				.sort({probability:1})
				.toArray()
				.then(resolve)
		})
	})
}