angular
.module('moviesList')
.factory('ManageMovie', ['$http', function ($http) {

	return {

		add: function (movieId) {
			var movieData = JSON.stringify({
				"media_id": movieId
			});

			console.log(movieData);

			$http({
				method: 'POST',
				url: 'https://api.themoviedb.org/3/list/17961/add_item?api_key='+ API_KEY +'&session_id='+ SESSION_ID,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				data: movieData
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

		remove: function (movieId) {
			var movieData = JSON.stringify({
				"media_id": movieId
			});

			console.log(movieData);

			$http({
				method: 'POST',
				url: 'https://api.themoviedb.org/3/list/17961/remove_item?api_key='+ API_KEY +'&session_id='+ SESSION_ID,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				data: movieData
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

		markAsSeen: function (movieId) {
			// Pour les films déjà vus
		}

	}
}]);