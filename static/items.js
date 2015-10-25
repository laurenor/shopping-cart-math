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

$("#start-button").on("click", randomSelect);



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

	var level = 5;

	var priceList = [];

	$("#product-img").empty();

	for (i=0; i < level; i++) {
		console.log(data[i]);

		var qtyNum = Math.random(1, level);

		var imgLink = data[i].document.img_link;
		var price = data[i].document.price;
		var name = data[i].document.name;
		var targetLink = data[i].document.link;

		priceList.push(price);

		$("#product-img").append("<td><div class='product'><a href='" + targetLink + "' target='_blank'><img src='" + imgLink + "' class='product-photo'></a></div></td>");
		$("#product-price").append("<td><p>Price: $" + price + "<br>Qty: " + qtyNum + "</p></td>");

	}

	calculateTotal(priceList);
}


function calculateTotal(priceList) {
	console.log(priceList);

	var totalPrice = 0

	for (i=0; i < priceList.length; i++) {
		totalPrice += parseInt(priceList[i]);

	}

	generateWrongResults(totalPrice);
}

function generateWrongResults(totalPrice) {
	var wrongAnswer = new Set([]);

	var answer = 4;

	while (wrongAnswer.length < answer) {
		var dec = Math.random();
		console.log("DEC: " + dec);

		var randInt = Math.random(0,answer);
		rs = (totalPrice+randInt+dec).toFixed(2);
		console.log("RS: " + rs);

		wrongAnswer.push(rs);
		console.log("WRONG ANSWERS LIST: " + wrongAnswer);
	}
}




