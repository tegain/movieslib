/**
* App Directive :: Movie card template
*/
angular
	.module('moviesList')
	.directive('movieCard', function() {

		return {
			restrict: 'E',
			templateUrl: 'templates/directives/movie-card.html'
		};
	});