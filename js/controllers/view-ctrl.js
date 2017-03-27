angular
.module('moviesList')
.controller('ViewController', ['$scope', '$http', '$routeParams', 'ManageMovie', function ($scope, $http, $routeParams, ManageMovie) {
	
	/**
	* Charge les infos du film
	*/
	$http
	.get('https://api.themoviedb.org/3/movie/'+ $routeParams.id +'?api_key='+ API_KEY +'&language=fr-FR')
	.then(
		function success(response) {
			$scope.view = response.data;
			$scope.movieId = response.data.id;
		},
		function fail(response) {
			console.log(response.statusText);
		}
	);
	
	/**
	* Charge les vidéos du film
	* Récupère seulement la première vidéo
	*/
	$http({
			method: 'GET',
			url: 'https://api.themoviedb.org/3/movie/'+ $routeParams.id +'/videos?api_key='+ API_KEY
		})
		.then(
			function success(response) {
				$scope.getVideos = response.data;
				$scope.videoUrl = 'https://www.youtube.com/embed/'+ response.data.results[0].key;
			},
			function fail(response) {
				$scope.getVideos = response.data || 'Request failed';
				console.log(response.data);
			}
		);

	/**
	* Charge la liste des acteurs du film
	*/
	$http({
			method: 'GET',
			url: 'https://api.themoviedb.org/3/movie/'+ $routeParams.id +'/credits?api_key='+ API_KEY
		})
		.then(
			function success(response) {
				$scope.getActors = response.data;
			},
			function fail(response) {
				$scope.getActors = response.data || 'Request failed';
				console.log(response.data);
			}
		);
	
	$scope.removeMovie = function (movieId) {
		// TODO: Ajouter une fenêtre de confirmation
		// ManageMovie.remove(movieId);
		alert('Supprimer le film ? (Pas d\'effet pour le moment)');
		console.log('Film supprimé');
	};
	
	var actorsSwiper = new Swiper ('.movie--view_actors', {
		initialSlide: 1,
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 0,
		observer: true
	});
		
}]);