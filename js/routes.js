angular
	.module('moviesList')
	//.config([, function ($locationProvider) { $locationProvider.hashPrefix(''); }])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		
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
			.when('/login', {
				templateUrl: 'templates/pages/login.html',
			})
			.otherwise({ redirectTo: '/' });
		
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('');
	}]);
	