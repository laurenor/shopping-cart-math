function getProductDescription() {

  var url = "/shopping_item.json"

  $.get(url, function (results){

  		var data = JSON.parse(results);

		console.log(data);

		$("#product-price").text(data.song_name);
		// $("#song-artist").text(" by " + data.artist + " [" + data.genre + "]");     
		// $("#song-spotify").html("<a href='" + data.spotify + "'>Play on Spotify</a>")  ;   


  })
}

$("#get-item").on("click", getProductDescription)