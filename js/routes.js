angular
	.module('moviesList')
	.config(['$routeProvider', function ($routeProvider) {
		
		$routeProvider
			.when('/', {
				templateUrl: 'templates/pages/movies.html',
				
			})
			.when('/view/:id', {
				templateUrl: 'templates/pages/view.html',
			})
			.when('/add', {
				templateUrl: 'templates/pages/add.html',
			})
			.otherwise({ redirectTo: '/' });
	}]);	