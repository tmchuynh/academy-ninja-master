// character values
var leftValue = 450, topValue = 100;
var walkValue = 1;

var background = document.getElementById("background");
var sushiItem = document.getElementsByClassName("sushi");
var pumpkinItem = document.getElementsByClassName("pumpkin");
var ninja = document.getElementById("character");
var lives = document.getElementsByClassName("icons");
var score = document.getElementsByClassName("number");

function update() {
	ninja.style.left = leftValue + "px";
	ninja.style.top = topValue + "px";
}

$(document).ready(function () {
	spawnItem("sushi")
	spawnItem("pumpkin")
})

// takes in a string = className
function spawnItem(item) {
	var i = document.createElement("img");
	var source = document.createAttribute("src");

	i.classList.add(item);

	if (item == "sushi") {
		source.value = "./img/onigiri.png";
		i.setAttributeNode(source);
	}
	else if (item == "pumpkin") {
		source.value = "./img/scaredy.png";
		i.setAttributeNode(source);
	}

	i.style.top = Math.floor(Math.random() * 501);
	i.style.left = Math.floor(Math.random() * 501);

	background.appendChild(i);
}


document.onkeydown = function (e) {
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

	if (checkCollision(sushiItem)) {
		score[0].innerHTML = parseInt(score[0].innerHTML) + 1;
		console.log(score[0].innerHTML)
		reSpawn();
	}
	else if (checkCollision(pumpkinItem)) {
		lives[0].remove(lives[0].lastChild);
		reSpawn();
	}
	update();

}

function reSpawn() {
	for (i = 9; i < background.childNodes.length + 1; i++) {
		console.log(background.childNodes[i]);
		if (!(background.childNodes[i].classList.contains("sushi"))) {
			spawnItem("sushi");
			break;
		}
		else if (!(background.childNodes[i].classList.contains("pumpkin"))) {
			spawnItem("pumpkin");
			break;
		}
	}
}

function removeElements(elements) {
	while (elements.length > 0) {
		elements[0].parentNode.removeChild(elements[0]);
	}
}

// takes in a document element 
function checkCollision(item) {

	var sushiLeft = item[0].style.left.replace("px", "");
	sushiLeft = parseInt(sushiLeft);
	var sushiTop = item[0].style.top.replace("px", "");
	sushiTop = parseInt(sushiTop);

	if (leftValue + 59 / 2 >= sushiLeft - 32 / 2 &&
		leftValue + 59 / 2 <= sushiLeft + 32 &&
		topValue >= sushiTop - 32 &&
		topValue - 86 <= sushiTop) {
		console.log('colliding');

		removeElements(item);

		return true;
	}
}
