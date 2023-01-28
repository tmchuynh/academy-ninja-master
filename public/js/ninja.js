// character values
var leftValue = 450, topValue = 100;
var walkValue = 1;

// pumpkin values
var p_leftValue, p_topValue;

var background = document.getElementById("background");
var sushiItem = document.getElementsByClassName("sushi");
var pumpkinItem = document.getElementsByClassName("pumpkin");
var ninja = document.getElementById("character");
var life = document.getElementsByClassName("life");
var score = document.getElementsByClassName("number");
var game_over_screen = document.getElementsByClassName("game_over");

function update() {
	ninja.style.left = leftValue + "px";
	ninja.style.top = topValue + "px";
	console.log(pumpkinItem);
	pumpkinItem[0].style.left = p_leftValue + "px";
	pumpkinItem[0].style.top = p_topValue + "px";
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
	i.setAttribute("id", item + 0);

	i.style.top = Math.floor(Math.random() * 501);
	i.style.left = Math.floor(Math.random() * 501);

	if (item == "sushi") {
		source.value = "./img/onigiri.png";
		i.setAttributeNode(source);
	}
	else if (item == "pumpkin") {
		source.value = "./img/scaredy.png";
		i.setAttributeNode(source);
		p_leftValue = parseInt(i.style.left);
		p_topValue = parseInt(i.style.top);
	}

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
		if (life[0].innerHTML > 1) {
			life[0].innerHTML = life[0].innerHTML - 1;
			reSpawn();
		}
		else {
			gameOver();
		}
	}
	update();

}

function reSpawn() {
	for (i = background.childNodes.length - 1; i < background.childNodes.length + 1; i++) {
		if (!(background.childNodes[i].classList.contains("sushi"))) {
			spawnItem("sushi");
			break;
		}
		if (!(background.childNodes[i].classList.contains("pumpkin"))) {
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
	console.log(item);
	var sushiLeft = item[0].style.left.replace("px", "");
	sushiLeft = parseInt(sushiLeft);
	var sushiTop = item[0].style.top.replace("px", "");
	sushiTop = parseInt(sushiTop);

	if (leftValue + 59 / 2 >= sushiLeft - 32 / 2 &&
		leftValue + 59 / 2 <= sushiLeft + 32 &&
		topValue >= sushiTop - 32 &&
		topValue - 86 <= sushiTop) {
		removeElements(item);
		return true;
	}
}

function gameOver() {
	life[0].innerHTML = life[0].innerHTML - 1;
	$(background).remove();
	game_over_screen[0].classList.remove("hide");
}

function reset() {
	location.reload()
}