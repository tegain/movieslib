/**
* App Controller :: Affiche la liste de films
*/
angular
.module('moviesList')
.controller('MoviesController', ['$scope', '$http', 'ManageMovie', function ($scope, $http, ManageMovie) {

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

	$scope.removeMovie = function (movieId) {
		ManageMovie.remove(movieId);
		//console.log('supprimé');
	};

	var moviesSwiper = new Swiper ('.movies--list', {
		initialSlide: 1,
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 20,
		observer: true
	});

}]);