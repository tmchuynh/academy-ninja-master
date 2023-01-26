var leftValue = 450, topValue = 100;
var walkValue = 1;
var sushi = document.getElementsByClassName("sushi");
var pumpkin = document.getElementsByClassName("pumpkin");
var ninja = document.getElementById("character");

function update() {
	ninja.style.left = leftValue + "px";
	ninja.style.top = topValue + "px";
}

$(document).ready(function () {
	sushi[0].classList.remove("hide")
})


document.onkeydown = function (e) {
	// console.log(e);

	if (walkValue == 1) {
		walkValue = 2;
	}
	else if (walkValue == 2) {
		walkValue = 1;
	}

	if (e.keyCode == 37 && leftValue > 0) { // LEFT
		leftValue = leftValue - 10;
		ninja.style.backgroundImage = "url('img/left" + walkValue + ".png')";

	}
	else if (e.keyCode == 39 && leftValue < 501) { // RIGHT
		leftValue = leftValue + 10;
		ninja.style.backgroundImage = "url('img/right" + walkValue + ".png')";
	}
	else if (e.keyCode == 40 && topValue < 501) { // DOWN
		topValue = topValue + 10;
		ninja.style.backgroundImage = "url('img/down" + walkValue + ".png')";
	}
	else if (e.keyCode = 38 && topValue > 0) { // UP
		topValue = topValue - 10;
		ninja.style.backgroundImage = "url('img/top" + walkValue + ".png')";
	}


	update();

}