/**
* App Directive :: Latest movie template
*/
angular
.module('moviesList')
.directive('movieCardLatest', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/directives/movie-card-latest.html'
	};
});