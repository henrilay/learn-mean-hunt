app.factory('AnimalService', function($q, $http) {
	return {
		getSpeciesList: () => {
			return $http.get('/api/species').then((response) => {
				return response.data
			})
		}
	}
})
