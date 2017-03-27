angular
	.module('moviesList')
	.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {
		
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
		
		// Ajoute Youtube embed à la whitelist pour éviter l'erreur
		// 'Error: $interpolate:interr Interpolation Error'
		$sceDelegateProvider.resourceUrlWhitelist([
			'self',
			"https://www.youtube.com/embed/**"
		]);
	}]);
	