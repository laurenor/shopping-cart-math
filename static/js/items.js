var SCORE = 0

var LEVEL = 1


function getProductDescription() {

  var url = "/shopping_item.json"

  $.get(url, function (data){


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
			console.log(data);

		}
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

	var priceList = [];
	console.log(data);
	console.log("showing items");

	$(".items-container").empty();

	for (i=0; i <= LEVEL; i++) {

		var qtyNum = Math.floor((Math.random() * LEVEL) + 1);
		var imgLink = data[i].img_link;
		var price = data[i].price;
		var name = data[i].name;
		var targetLink = data[i].link;

		priceList.push(price * qtyNum);

		$(".items-container").append("<div class='product'><a href='" + targetLink + "' target='_blank'><img src='" + imgLink + "' class='product-photo'></a><p>Price: $" + price + "<br>Qty: " + qtyNum + "</p></div>");


	}

	calculateTotal(priceList);
}


function calculateTotal(priceList) {

	var totalPrice = 0

	for (i=0; i < priceList.length; i++) {
		totalPrice += parseFloat(priceList[i]);

	}

	totalPrice = totalPrice.toFixed(2);

	generateWrongResults(totalPrice);
}

function generateWrongResults(totalPrice) {

	var possibleAnswers = [];
	possibleAnswers.push(totalPrice)

	var count = 1
	var answer = 4;

	while (count < answer) {
		var dec = Math.random();

		var randInt = Math.random(0,answer);
		rs = (parseFloat(totalPrice)+parseFloat(randInt)+parseFloat(dec));
		rs = rs.toFixed(2);

		possibleAnswers.push(rs);
		count++;
	};

	possibleAnswers = shuffleArray(possibleAnswers);	
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
	$("#btn1").removeClass("correct-answer");
	$("#btn1").removeClass("incorrect-answer");
	
	$("#btn2").removeClass("correct-answer");
	$("#btn2").removeClass("incorrect-answer");
	
	$("#btn3").removeClass("correct-answer");
	$("#btn3").removeClass("incorrect-answer");
	
	$("#btn4").removeClass("correct-answer");
	$("#btn4").removeClass("incorrect-answer");
	

	var allAnswers = document.getElementsByClassName("choice-button");

	for (var i= 0; i < allAnswers.length; i++) {
		allAnswers[i].removeEventListener('click', goToNextLevel, false);
		};


	$("#btn1").attr("value", "$"+possibleAnswers[0]);
	$("#btn2").attr("value", "$"+possibleAnswers[1]);
	$("#btn3").attr("value", "$"+possibleAnswers[2]);
	$("#btn4").attr("value", "$"+possibleAnswers[3]);

	for (i=0; i < possibleAnswers.length; i++) {

		if (possibleAnswers[i] === totalPrice) {
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
		incorrectAnswers[i].addEventListener('click', stayOnLevel, false);
		};
}

function addListenerToCorrect() {

	var correctAnswer = document.getElementsByClassName("correct-answer");
	for (var i= 0; i < correctAnswer.length; i++) {
		correctAnswer[i].addEventListener('click',goToNextLevel,false);
	};
}
	


function goToNextLevel() {
	LEVEL++;
	$('#level-number').text(LEVEL);
	randomSelect();
	if (LEVEL > 5) {
		$('#contents').empty();
		$('#contents').html("<center><div class='congrats'>Congratulations! Go math!</div><br><img src='static/img/logo.png'></center>");
	}

	// alert("You're awesome");
}

function stayOnLevel() {
	// alert("you suck");
}








