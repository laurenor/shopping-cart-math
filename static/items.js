var SCORE = 0

var LEVEL = 1


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

	var level = 2;

	var priceList = [];

	$("#product-img").empty();

	for (i=0; i <= level; i++) {
		console.log(data[i]);

		var qtyNum = Math.floor((Math.random() * level) + 1);
		var imgLink = data[i].document.img_link;
		var price = data[i].document.price;
		var name = data[i].document.name;
		var targetLink = data[i].document.link;

		priceList.push(price * qtyNum);

		$(".items-container").append("<div class='product'><a href='" + targetLink + "' target='_blank'><img src='" + imgLink + "' class='product-photo'></a><p>Price: $" + price + "<br>Qty: " + qtyNum + "</p></div>");


	}

	calculateTotal(priceList);
}


function calculateTotal(priceList) {
	console.log(priceList);

	var totalPrice = 0

	for (i=0; i < priceList.length; i++) {
		console.log("calculating total");
		totalPrice += parseFloat(priceList[i]);

	}

	totalPrice = totalPrice.toFixed(2);
	console.log("total price: " + totalPrice);

	generateWrongResults(totalPrice);
}

function generateWrongResults(totalPrice) {
	console.log("generating wrong results");
	var possibleAnswers = [];
	possibleAnswers.push(totalPrice)

	console.log(possibleAnswers);
	console.log(typeof possibleAnswers);
	var count = 1
	var answer = 4;

	while (count < answer) {
		console.log("CURRENT COUNT: " + count);
		var dec = Math.random();
		console.log("DEC: " + dec);

		var randInt = Math.random(0,answer);
		rs = (parseFloat(totalPrice)+parseFloat(randInt)+parseFloat(dec));
		rs = rs.toFixed(2);
		console.log("RS: " + rs);

		possibleAnswers.push(rs);
		console.log("WRONG ANSWERS LIST: " + possibleAnswers);
		count++;
	};

	console.log(possibleAnswers);
	possibleAnswers = shuffleArray(possibleAnswers);	
	console.log(possibleAnswers);

	assignButtonValues(possibleAnswers, totalPrice);
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(possibleAnswers) {
    for (var i = possibleAnswers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = possibleAnswers[i];
        possibleAnswers[i] = possibleAnswers[j];
        possibleAnswers[j] = temp;
    }
    return possibleAnswers;
}

function assignButtonValues(possibleAnswers, totalPrice) {

	$("#btn1").attr("value", "$"+possibleAnswers[0]);
	$("#btn2").attr("value", "$"+possibleAnswers[1]);
	$("#btn3").attr("value", "$"+possibleAnswers[2]);
	$("#btn4").attr("value", "$"+possibleAnswers[3]);

	for (i=0; i < possibleAnswers.length; i++) {

		if (possibleAnswers[i] === totalPrice) {
			console.log("I've assigned a correct class");

			$("#btn"+(i+1)+"").addClass("correct-answer");
		} else {
			$("#btn"+(i+1)+"").addClass("incorrect-answer");
		}
	}

	addListenerToIncorrect();
	addListenerToCorrect();

}


$(".correct-answer").on('click', goToNextLevel);
$(".incorrect-answer").on('click', stayOnLevel);

function addListenerToIncorrect() {

	var incorrectAnswers = document.getElementsByClassName("incorrect-answer");

	for (var i= 0; i < incorrectAnswers.length; i++) {
		console.log(incorrectAnswers[i]);
		incorrectAnswers[i].addEventListener('click', stayOnLevel, false);
		};
}

function addListenerToCorrect() {

	var correctAnswer = document.getElementsByClassName("correct-answer");
	console.log(typeof correctAnswer);
	for (var i= 0; i < correctAnswer.length; i++) {
		console.log(correctAnswer[i]);
		correctAnswer[i].addEventListener('click',goToNextLevel,false);
	};
}
	


function goToNextLevel() {

	alert("You're awesome");
}

function stayOnLevel() {
	alert("you suck");
}








