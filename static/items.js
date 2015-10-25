function getProductDescription() {

  var url = "/shopping_item.json"

  $.get(url, function (data){


		console.log(data);


		$("#product-price").text("$" + data.price);
		$("#product-name").text(data.name);     
		$("#product-link").html("<a href='" + data.link + "'>View on Target.com</a>")  ;   
		$("#product-img").html("<img src='" + data.img_link + "' target='_blank'>")  ;   

  })
}

$("#get-item").on("click", getProductDescription);