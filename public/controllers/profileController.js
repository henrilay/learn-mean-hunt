app.controller('ProfileCtrl', function($scope, session, UserService) {
	$scope.user = session.user

	$scope.update = (newUser) => {
		UserService.updateUser(newUser).then((user) => {
			$scope.user = user
		})
	}
})