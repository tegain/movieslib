angular
.module('moviesList')
.controller('ViewController', ['$scope', '$window', '$timeout', '$http', '$routeParams', 'ManageMovie', function ($scope, $window, $timeout, $http, $routeParams, ManageMovie) {
	
	var viewMovieId = $routeParams.id;
	
	/**
	* Loads movie datas
	*/
	$http
	.get('https://api.themoviedb.org/3/movie/'+ $routeParams.id +'?api_key='+ API_KEY +'&language=fr-FR')
	.then(
		function success(response) {
			$scope.view = response.data;
			$scope.movieId = response.data.id;
		},
		function fail(response) {
			console.error(response.statusText);
		}
	);
	
	/**
	* Loads movie's first video
	* @param $routeParams.id = movie ID (in URL)
	*/
	$http({
			method: 'GET',
			url: 'https://api.themoviedb.org/3/movie/'+ $routeParams.id +'/videos?api_key='+ API_KEY
		})
		.then(
			function success(response) {
				$scope.getVideos = response.data;
				$scope.hasVideos = true;
				
				/**
				* http://stackoverflow.com/questions/15164942/stop-embedded-youtube-iframe 
				* Adds '?enablejsapi=1' to enable events like 'StopVideo' when clicking on 'Close' button
				*/
				if (response.data.results.length > 0) {
					$scope.videoUrl = 'https://www.youtube.com/embed/'+ response.data.results[0].key +'?enablejsapi=1';
				}
				else {
					$scope.hasVideos = false;
				}
				
			},
			function fail(response) {
				$scope.getVideos = response.data || 'Request failed';
				console.error(response.data);
			}
		);

	/**
	* Get movie's actors list
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
				console.error(response.data);
			}
		);
	
	/**
	 * Removes movie from library
	 */
	$scope.removeMovie = function (movieId) {

		var movieTitle = document.querySelector('.movie--view').getAttribute('data-movie-title');

		var modal = document.createElement('div');
			modal.id = 'modal-container';
			modal.classList.add('modal--container');
			modal.classList.add('remove--movie');

		var modalContent = document.createElement('div');
			modalContent.classList.add('modal--content');
			modalContent.classList.add('remove--movie_content');
			modalContent.innerHTML =	'<p>Supprimer le film <strong>'+ movieTitle +'</strong> ?</p>';
			modalContent.innerHTML +=	'<p><button id="modal-valid" class="modal--btn_valid button">Supprimer</button></p>';
			modalContent.innerHTML +=	'<p><button id="modal-cancel" class="modal--btn_cancel">Annuler</button></p>';

		var modalOverlay = document.createElement('div');
			modalOverlay.classList.add('modal--overlay');

		/**
		 * Appends modal to DOM
		 */
		modal.appendChild(modalContent);
		modal.appendChild(modalOverlay);
		document.body.appendChild(modal);

		function removeCallback () {
			var $modal = document.querySelector('#modal-container');
			var $modalContent = document.querySelector('.modal--content');

			$modalContent.innerHTML = '<p>Film supprimé</p>';

			$timeout(function () {
				$modal.classList.add('movie--removed');
			}, 400);

			/**
			 * Redirects to home after callback message
			 */
			$timeout(function () {
				$modal.remove();
				$window.location.href = '/';
			}, 800);
		}

		document.querySelector('#modal-cancel').addEventListener('click', function () {
			$timeout(function() {
				document.querySelector('#modal-container').remove();
			}, 800);
		});

		document.querySelector('#modal-valid').addEventListener('click', function () {
			/**
			 * @param movieId : movie ID
			 * @param removeCallback : executes after remove $http request
			 * @deps: /js/services/manage-movie.js
			 */
			ManageMovie.remove(movieId, removeCallback());
		});
		
	};
	
	/**
	 * Mark a movie as already seen (uses Local Storage)
	 * @deps: /js/services/manage-movie.js
	 */
	$scope.markAsSeen = function (movieId, container) {
		ManageMovie.markAsSeen(movieId, container);
	};
	
	/**
	 * Adds attribute to button if a movie is already seen (for CSS use)
	 * @deps: /js/services/manage-movie.js
	 */
	if(ManageMovie.getSeenInfos(viewMovieId)) {
		document.querySelector('.btn--addToSeen').setAttribute('data-seen', true);
	}
	
	/**
	 * Create Swiper for Actors list
	 * 
	 * Swiper doc: http://idangero.us/swiper/api/
	 */
	var actorsSwiper = new Swiper ('.movie--view_actors', {
		initialSlide: 1,
		slidesPerView: 'auto',
		centeredSlides: true,
		pagination: '.swiper-pagination',
		breakpoints: {
			1024: {
				pagination: false
			}	
		},
		spaceBetween: 0,
		observer: true
	});
	
	
	/**
	* SHOW / HIDE Trailer
	*/
	document.querySelector('.btn--watchTrailer').addEventListener('click', function () {
		document.querySelector('.movie--view').setAttribute('data-trailer', 'is-visible');
	});
	
	// Hides Trailer when clicking on 'Close' button
	document.querySelector('.btn--closeTrailer').addEventListener('click', function () {
		document.querySelector('.movie--view').removeAttribute('data-trailer');
		document.querySelector('#trailer-yt').contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
	});


	/**
	 * Reordering elements depending on window size
	 */
	function reorderElements () {
		var poster = document.querySelector('.movie--view_poster');

		if ($window.innerWidth >= 1024) {

			/**
			 * Moving elements
			 * Not providing $timeout delay executes function after Angular DOM is rendered
			 */
			$timeout(function () {
				document.querySelector('.movie--view_content').insertBefore(poster, document.querySelector('.movie--view_content').firstChild);
			});
		}
		else {
			$timeout(function () {
				document.querySelector('.movie--view_backdrop').appendChild(poster);
			});
		}
	}

	reorderElements();

	angular.element($window).bind('resize', function(){
		reorderElements();

		// Manual $digest required as resize event is outside of angular
		$scope.$digest();
	});
		
}]);