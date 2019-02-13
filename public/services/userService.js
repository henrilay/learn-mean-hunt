app.factory('UserService', function($q, $http) {
	return {
		getSession: () => {
			return $http.get('/api/profile/me').then((response) => {
				return response.data
			})
		},
		updateUser: (newUser) => {
			return $http.post('/api/profile/me', {newUser: newUser}).then((response) => {
				return response.data
			})
		},
		attemptCapture: (specie) => {
			return $http.get('/api/capture/' + specie).then((response) => {
				return response.data
			})
		},
		getStats: () => {
			return $http.get('/api/stats').then((response) => {
				return response.data
			})
		},
		getMyStats: () => {
			return $http.get('/api/stats/me').then((response) => {
				return response.data
			})
		}
	}
})
