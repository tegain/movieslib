angular
.module('moviesList')
.controller('ViewController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

	$http
	.get('https://api.themoviedb.org/3/movie/'+ $routeParams.id +'?api_key='+ API_KEY +'&language=fr-FR')
	.then(
		function success(response) {
			$scope.view = response.data;
			//console.log($scope.view.title);
		},
		function fail(response) {
			console.log(response.statusText);
		}
	);
}]);