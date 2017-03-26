/**
* App Directive :: Template pour le film le plus récent
*/
angular
.module('moviesList')
.directive('movieCardLatest', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/directives/movie-card-latest.html'
	};
});