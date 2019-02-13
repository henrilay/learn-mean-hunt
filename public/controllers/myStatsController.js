app.controller('MyStatsCtrl', function($scope, session, UserService) {
	$scope.user = session.user
	UserService.getMyStats().then((myStats) => {
		$scope.labels = myStats.map((each) => each._id.name)
		$scope.series = ['seen', 'capture']
		$scope.data = [myStats.map((each) => each.seen), myStats.map((each) => each.capture)]
	})

	UserService.getStats().then((res) => {
		$scope.isAboveAvgScore = $scope.user.score > res.avgScore
	})
})