(function() {
	
	var API_KEY = 'c50f2b116ba0aa39381424dd31c38204',
		isLogged = false;
	
	
	/**
	* Main app
	*/
	angular.module('moviesList', ['ngRoute']);
	
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
							
							window.location = "https://www.themoviedb.org/authenticate/"+ response.data.request_token +"/allow?redirect_to=https://www.csg-studio.com/films/#!/add";
							
							
							//return response.data.request_token;
						},
						function fail(response) {
							$scope.token = response.data || 'Request token failed';
							console.log($scope.token);
						}
					);
			}
			
			
			$scope.getSession = function () {
				/**
				* Requête pour récupérer l'id de la session
				*/
				$http
					.get('https://api.themoviedb.org/3/authentication/session/new?api_key='+ API_KEY +'&request_token='+ TOKEN)
					.then(function (response) {
						$scope.session = response.data;
					},
					function (response) {
						$scope.session = response.data || 'Request failed';

					});
			};
			
		}]);
	
	/**
	* App Controller :: Affiche la liste de films
	*/
	angular
		.module('moviesList')
		.controller('MoviesController', ['$scope', '$http', function ($scope, $http) {
		
		/**
		* Attache le controller au scope au lieu de 'this' :
		* http://stackoverflow.com/questions/31115770/angular-js-ng-repeat-doesnt-work
		*/
	
		$http
			.get('https://api.themoviedb.org/3/list/17961?api_key='+ API_KEY +'&language=fr-FR')
			.then(
				function success(response) {
					$scope.movies = response.data.items;
				},
				function fail(response) {
					console.log(response.statusText);
				}
			);

		}]);
	
	
	angular
		.module('moviesList')
		.controller('ViewController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

			//console.log($routeParams.id);
			
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
	
	angular
		.module('moviesList')
		.controller('SearchController', ['$scope', '$http', function ($scope, $http) {

			
/*			
			$scope.login = function () {
				$http
					.get('https://api.themoviedb.org/3/authentication/token/new?api_key='+ API_KEY)
					.then(
						function success(response) {
							$scope.login = response.data;
							console.log($scope.login.request_token);
							
							
							window.location = "https://www.themoviedb.org/authenticate/"+ $scope.login.request_token;
							isLogged = true;
						},
						function fail(response) {
							$scope.login = response.data || 'Request failed';
							console.log($scope.login);
						}
					);
			};*/
		
			$scope.search = function (query) {
				$http
					.get('https://api.themoviedb.org/3/search/movie?api_key='+ API_KEY +'&language=fr-FR&adult=false&query='+ query)
					.then(
						function success(response) {
							$scope.search = response.data;
							//console.log($scope.search);
						},
						function fail(response) {
							console.log(response.statusText);
						}
					);
			};
			
			$scope.add = function (movieId) {
				var movieData = JSON.stringify({
					"media_id": movieId
				});
				
				console.log(movieData);
				
				$http({
						method: 'POST',
						url: 'https://api.themoviedb.org/3/list/17961/add_item?api_key='+ API_KEY,
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						},
						data: movieData
					})
					.then(
						function success(response) {
							$scope.add = response.data;
							console.log($scope.add);
						},
						function fail(response) {
							$scope.data = response.data || 'Request failed';
							console.log($scope.data);
						}
					);
			}
		}]);
	
	/**
	* App Directive :: Template pour chaque film
	*/
	angular
		.module('moviesList')
		.directive('movieCard', function() {
		
			return {
				restrict: 'E',
				templateUrl: 'templates/directives/movie-card.html'
			};
		});
	
})();