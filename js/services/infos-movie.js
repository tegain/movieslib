angular
.module('moviesList')
.factory('InfosMovie', ['$http', function ($http) {

	return {

		getVideos: function (movieId) {
			/*var movieData = JSON.stringify({
				"media_id": movieId
			});*/


			$http({
				method: 'GET',
				url: 'https://api.themoviedb.org/3/movie/'+ movieId +'/videos?api_key='+ API_KEY
			})
			.then(
				function success(response) {
					return response.data;
					console.log(response.data);
				},
				function fail(response) {
					//$scope.data = response.data || 'Request failed';
					return response.data || 'Request failed';
					console.log(response.data);
				}
			);
		},

		getActors: function (movieId) {
	
			$http({
				method: 'GET',
				url: 'https://api.themoviedb.org/3/movie/'+ movieId +'/credits?api_key='+ API_KEY
			})
			.then(
				function success(response) {
					//console.log('https://api.themoviedb.org/3/movie/'+ movieId +'/credits?api_key='+ API_KEY);
					console.log('from Factory : '+ response.data);
					return response.data;
				},
				function fail(response) {
					//$scope.data = response.data || 'Request failed';
					return response.data || 'Request failed';
					console.log(response.data);
				}
			);
		},

	}
}]);