angular
.module('moviesList')
.controller('SearchController', ['$scope', '$http', '$routeParams', 'ManageMovie', function ($scope, $http, $routeParams, ManageMovie) {

	var TOKEN = $routeParams.request_token;
	console.log('TOKEN : '+ TOKEN);

	$scope.getSession = function () {
		/**
		* Requête pour récupérer l'id de la session
		*/
		$http
		.get('https://api.themoviedb.org/3/authentication/session/new?api_key='+ API_KEY)
		.then(function (response) {
			$scope.session = response.data;
			console.log('GET /session id/ : '+ response.data.status_message);
		},
		function (response) {
			$scope.session = response.data || 'Request failed';
			console.log('GET /session/ : '+ response.data.status_message);
		});
	};

	$scope.searchMovie = function (query) {
		$http
		.get('https://api.themoviedb.org/3/search/movie?api_key='+ API_KEY +'&language=fr-FR&adult=false&query='+ query)
		.then(
			function success(response) {
				$scope.searchMovie = response.data;
				//console.log($scope.search);
			},
			function fail(response) {
				console.log(response.statusText);
			}
		);
	};

	$scope.addMovie = function (movieId) {
		ManageMovie.add(movieId);
	};

	$scope.removeMovie = function (movieId) {
		ManageMovie.remove(movieId);
		console.log('supprimé');
	};

}]);