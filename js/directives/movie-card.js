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