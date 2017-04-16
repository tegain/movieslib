angular
.module('moviesList')
.controller('SearchController', ['$scope', '$http', '$timeout', '$routeParams', 'ManageMovie', function ($scope, $http, $timeout, $routeParams, ManageMovie) {

	$scope.getSession = function () {

		/**
		* Get SESSION_ID (required in order to add new movies to library)
		*
		* @doc: https://developers.themoviedb.org/3/authentication/create-session
		*/
		$http
		.get('https://api.themoviedb.org/3/authentication/session/new?api_key='+ API_KEY)
		.then(function (response) {
			$scope.session = response.data;
			console.log('GET /session id/ : '+ response.data.status_message);
		},
		function (response) {
			$scope.session = response.data || 'Request failed';
			console.error('GET /session/ : '+ response.data.status_message);
		});
	};

	/**
	 * Search for movies in TMDB database
	 * 
	 * @doc: https://developers.themoviedb.org/3/search/search-movies
	 */
	$scope.searchMovie = function (query) {
		$http
		.get('https://api.themoviedb.org/3/search/movie?api_key='+ API_KEY +'&language=fr-FR&adult=false&query='+ query)
		.then(
			function success(response) {
				$scope.searchResults = response.data;
				$scope.form.search.$setPristine(true);
			},
			function fail(response) {
				console.error(response.statusText);
			}
		);
	};

	/**
	 * Adds movie to library (on Search Screen)
	 * @deps: /js/services/manage-movie.js
	 */
	$scope.addMovie = function (movieId) {

		var movieTitle = document.querySelector('[data-movie-id="'+ movieId +'"]').getAttribute('data-movie-title');

		var modal = document.createElement('div');
			modal.id = 'modal-container';
			modal.classList.add('modal--container');
			modal.classList.add('add--movie');

		var modalContent = document.createElement('div');
			modalContent.classList.add('modal--content');
			modalContent.classList.add('add--movie_content');
			modalContent.innerHTML = '<p>Le film <strong>'+ movieTitle +'</strong> est ajouté à la liste.</p>';

		var modalOverlay = document.createElement('div');
			modalOverlay.classList.add('modal--overlay');

		/**
		 * Appends modal to DOM
		 */
		modal.appendChild(modalContent);
		modal.appendChild(modalOverlay);
		document.body.appendChild(modal);

		function addCallback () {
			var $modal = document.querySelector('#modal-container');

			$timeout(function () {
				$modal.classList.add('movie--added');
			}, 400);

			/**
			 * Removes modal
			 */
			$timeout(function () {
				$modal.remove();
			}, 1200);

			document.querySelector('[data-movie-id="'+ movieId +'"]').classList.add('is-fadedOut');
		}
		/**
		 * Create Comfirmation modal
		 */
		ManageMovie.add(movieId, addCallback());
		
	};

}]);