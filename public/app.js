var app = angular.module('myApp', ['ngRoute', 'chart.js'])

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/hunt.html',
			controller: 'HuntCtrl',
			resolve: {
				session: (UserService) => UserService.getSession()
			}
		})
		.when('/mystats', {
			templateUrl: 'views/mystats.html',
			controller: 'MyStatsCtrl',
			resolve: {
				session: (UserService) => UserService.getSession()
			}
		})
		.when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileCtrl',
			resolve: {
				session: (UserService) => UserService.getSession()
			}
		})
		.otherwise({
	     	redirectTo: '/'
	    })
})