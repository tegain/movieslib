angular
.module('moviesList')
.controller('ConfigController', ['$scope', '$http', function ($scope, $http) {

	$http
	.get('https://api.themoviedb.org/3/configuration?api_key='+ API_KEY)
	.then(
		function success(response) {
			$scope.config = response.data.images;
		},
		function fail(response) {
			console.log(response.statusText);
		}
	);

	/**
	* Requête pour récupérer le token
	*/
	$scope.initToken = function () {
		$http
		.get('https://api.themoviedb.org/3/authentication/token/new?api_key='+ API_KEY)
		.then(
			function success(response) {
				console.log(response.data.request_token);

				window.location = "https://www.themoviedb.org/authenticate/"+ response.data.request_token +"?redirect_to=http://movies.dev/add";


				//return response.data.request_token;
			},
			function fail(response) {
				$scope.token = response.data || 'Request token failed';
				console.log($scope.token);
			}
		);
	}
}]);