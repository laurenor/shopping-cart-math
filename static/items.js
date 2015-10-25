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

$("#get-item").on("click", randomSelect);



function randomSelect(){

	var level = 2;

	$.ajax({
	url       : 'https://api-us.clusterpoint.com/v4/102232/hackingedu/_query?transaction_id=TID',
	type      : 'POST',
	dataType  : 'json',
	data      : 'SELECT * FROM hackingedu ORDER BY Math.random() LIMIT 5',
	beforeSend: function (xhr) {
		xhr.setRequestHeader('Authorization', 'Basic ' + btoa('susancodes@gmail.com:hackingedu'));
	},
	success   : function (data) {
		if (typeof success != 'undefined') {
			success(data);

		}
			console.log(data.results);
			showItems(data.results);
	},
	fail      : function (data) {
		alert(data.error);
		if (typeof fail != 'undefined') {
			fail(data);
		}
	}
});
}


function showItems(data) {
	console.log(data);

	var level = 3;

	$("#product-img").empty();
	
	for (i=0; i < level; i++) {
		console.log(data[i])

		var imgLink = data[i].document.img_link;
		var price = data[i].document.price;
		var name = data[i].document.name;
		var targetLink = data[i].document.link;


		$("#product-img").append("<a href='" + targetLink + "' target='_blank'><img src='" + imgLink + "'></a><p>" + name + "</p><p>" + price + "</p>");


	}
}