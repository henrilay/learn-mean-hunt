app.controller('HuntCtrl', function($scope, session, UserService, AnimalService) {
	$scope.user = session.user
	$scope.attemptsList = session.attemptsList
	$scope.speciesList = false
	AnimalService.getSpeciesList().then((speciesList) => {
		$scope.speciesList = speciesList
		$scope.chartData = getChartData()
	})

	var getChartData = () => {
		let data = []
		for(var i=0; i<$scope.speciesList.length; i++) {
			data.push($scope.attemptsList
						.filter((attempt) => attempt.type === $scope.speciesList[i] && attempt.outcome === true)
						.reduce((acc, val) => acc+=1, 0))
		}
		return data
	}

	$scope.hunt = (specie) => {
		UserService.attemptCapture(specie).then((attemptsList) => {
			$scope.attemptsList = attemptsList
			$scope.chartData = getChartData()
			UserService.getSession().then((resSession) => {
				$scope.user = resSession.user
			})
		})
	}

	$scope.displayDate = (isoDate) => {
		return (new Date(isoDate)).toLocaleString()
	}
})