/**
* App Controller :: Displays movies list
*/
angular
.module('moviesList')
.controller('MoviesController', ['$scope', '$window', '$http', 'ManageMovie', function ($scope, $window, $http, ManageMovie) {

	/**
	* Attaches controller to $scope instead of 'this' :
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

	/**
	 * Excerpt length depending on window width
	 */
	$scope.exerptLength = function () {
		return ($window.innerWidth < 800) ? 80 : 260
	};

	/**
	 * Quickly removes movie from short card
	 */
	//$scope.removeMovie = function (movieId) {
	//	ManageMovie.remove(movieId);
	//};
	
	/**
	 * Checks for 'Seen' key in Local Storage and adds attribute to movie card
	 */
	$scope.getSeenInfos = function (movieId) {
		return ManageMovie.getSeenInfos(movieId);
	};
	
	/**
	 * Initialize Swiper slider for mobile devices
	 * 
	 * Swiper doc: http://idangero.us/swiper/api/
	 */
	function moviesSlider () {
		if ($window.innerWidth < 1024) {
			var moviesSwiper = new Swiper ('.movies--list', {
				initialSlide: 1,
				slidesPerView: 'auto',
				centeredSlides: true,
				spaceBetween: 20,
				observer: true // Enables watching over Angular loading instead of standard DOM
			});
		}
		else {
			/**
			 * Destroy swiper on desktop screens
			 * 
			 * @params
			 * moviesSwiper.destroy(deleteInstance, cleanupStyles);
			 * deleteInstance - boolean - Set it to false (by default it is true) to not to delete Swiper instance
			 * cleanupStyles - boolean - Set it to true (by default it is false) and all custom styles will be removed from slides
			 */
			if (typeof moviesSwiper !== 'undefined') {
				moviesSwiper.destroy(false, true);
			}
		}
	}

	moviesSlider();

	/**
	 * On $window resize, executes moviesSlider()
	 */
	angular.element($window).bind('resize', function(){
		moviesSlider();

		// Manual $digest required as resize event is outside of angular
		$scope.$digest();
	});

}]);