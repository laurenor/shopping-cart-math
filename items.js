function getProductDescription() {

  var url = "/shopping_item.json"

  $.get(url, function (data){

		console.log(data);

		// $("#song-title").text(data.song_name);
		// $("#song-artist").text(" by " + data.artist + " [" + data.genre + "]");     
		// $("#song-spotify").html("<a href='" + data.spotify + "'>Play on Spotify</a>")     


  })
}