angular
.module('moviesList')
.factory('ManageMovie', ['$http', function ($http) {

	return {

		/**
		 * Adds a movie to the library by its ID
		 * 
		 * @doc: https://developers.themoviedb.org/3/lists/add-movie
		 */
		add: function (movieId, callback) {
			var movieData = JSON.stringify({
				"media_id": movieId
			});

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

					/**
					 * Executes callback function after adding movie, if there is one
					 */
					if (callback) {
						callback;
					}
				},
				function fail(response) {
					return response.data || 'Request failed';
					console.error(response.data);
				}
			);
		},

		/**
		 * Removes a movie from library by its ID
		 * @param movieId -> movie ID
		 * @param callback -> callback function to be executed after removing movie
		 * 
		 * @doc: https://developers.themoviedb.org/3/lists/remove-movie
		 */
		remove: function (movieId, callback) {
			var movieData = JSON.stringify({
				"media_id": movieId
			});

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

					/**
					 * Executes callback function after removing movie, if there is one
					 */
					if (callback) {
						callback;
					}
				},
				function fail(response) {
					return response.data || 'Request failed';
					console.error(response.data);
				}
			);
		},

		/**
		 * Mark a movie as already seen (uses Local Storage)
		 * Adds a unique key to Local Storage containing movie ID.
		 * 
		 * Toggle the 'Seen' state by adding or removing key from Local Storage)
		 * 
		 * @param movieId -> movie ID
		 * @param container -> DOM element (css selector) to add attribute for CSS purpose
		 */
		markAsSeen: function (movieId, container) {
			if (!localStorage.getItem('alreadySeen-'+ movieId)) {
				localStorage.setItem('alreadySeen-'+ movieId, true);
				document.querySelector(container).setAttribute('data-seen', true);
				//console.log('Film '+ movieId +' ajouté à la liste des films déjà vus !');
			}
			else {
				localStorage.removeItem('alreadySeen-'+ movieId);
				document.querySelector(container).removeAttribute('data-seen');
				//console.log('Film '+ movieId +' retiré à la liste des films déjà vus !');
			}
		},
		
		/**
		 * Checks for movie's key in Local Storage
		 * @returns TRUE if the movie is already marked as 'Seen' 
		 */
		getSeenInfos: function (movieId) {
			if (localStorage.getItem('alreadySeen-'+ movieId)) {
				return true
			}
			else {
				return false
			}
		},


	}
}]);