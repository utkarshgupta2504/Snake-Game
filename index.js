let started = false;

var canvas = document.getElementById('board');
	var ctx = canvas.getContext('2d');

	const width = 520;
	const height = 520;

	const n = 20;

	const cellSize = 26;

	function initBoard() {

		for(var i = 0; i < n; i++) {

			for(var j = 0; j < n; j++) {

				if((i + j)%2 == 0) {

					ctx.fillStyle = "#A7D948";
				}

				else {

					ctx.fillStyle = "#8ECC39"
				}

				ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
			}
		}
	}

	initBoard();



function playGame() {

	/*******************Initialising the board colors**********************/

	var canvas = document.getElementById('board');
	var ctx = canvas.getContext('2d');

	const width = 520;
	const height = 520;

	const n = 20;

	const cellSize = 26;

	function initBoard() {

		for(var i = 0; i < n; i++) {

			for(var j = 0; j < n; j++) {

				if((i + j)%2 == 0) {

					ctx.fillStyle = "#A7D948";
				}

				else {

					ctx.fillStyle = "#8ECC39"
				}

				ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
			}
		}
	}

	initBoard();

	/**********************Game handles**********************/

	var snakeBody = [];

	snakeBody.push([n/2 - 1, n/2]);
	snakeBody.push([n/2, n/2]);
	snakeBody.push([n/2 + 1, n/2]);

	//0 -> left, 1 -> up, 2 -> right, 3 -> down

	var state = 0; 

	let eyeImage = new Image();
	eyeImage.src = "https://i.imgur.com/6jLbz7l.png";

	let foodImage = new Image();
	foodImage.src = "https://i.imgur.com/88saChB.png";

	let counter = 0;
	let foodX = 0;
	let foodY = 0;

	function playAudio() {

		let audio = new Audio('https://www.soundjay.com/switch/switch-1.wav');
		audio.play();
	}

	function playConsume() {

		let audio = new Audio('https://www.soundjay.com/button/button-3.wav');
		audio.play();
	}

	function generateFood() {

		let success = false;

		while(!success) {

			foodX = parseInt(Math.random()*n);
			foodY = parseInt(Math.random()*n);

			success = true;

			for(var i = 0; i < snakeBody.length; i++) {

				if(snakeBody[i][0] == foodX && snakeBody[i][1] == foodY) {

					success = false;
					break;
				}
			}
		}
	}

	generateFood();

	$(document).on('keydown', e => {

		switch (e.keyCode) {
			case 37: 	//Left Key

				if(state != 0 && state != 2) {

					state = 0;
					playAudio();
				}
				break;

			case 38: 	//Up Key

				if(state != 1 && state != 3) {

					state = 1;
					playAudio();
				}
				break;

			case 39: 	//Right Key

				if(state != 0 && state != 2) {

					state = 2;
					playAudio();
				}
				break;

			case 40: 	//Down Key

				if(state != 1 && state != 3) {

					state = 3;
					playAudio();
				}
				break;

			default:

				break;
		}
	});

	function update() {

		counter++;

		let increaseLength = false;

		console.log(snakeBody[0], foodX, foodY);

		if(snakeBody[0][0] == foodX && snakeBody[0][1] == foodY) {

			console.log('Consumed!');
			playConsume();
			increaseLength = true;
			generateFood();
		}

		initBoard();

		ctx.drawImage(foodImage,
			foodX * cellSize, foodY * cellSize,
			cellSize, cellSize);

		for(var i = 0; i < snakeBody.length; i++) {

			ctx.fillStyle = "#527DF9";
			ctx.fillRect(cellSize * (snakeBody[i][0]), cellSize * (snakeBody[i][1]), cellSize, cellSize);

		if(i == 0) { //Snake head (For eyes)

			var marginX = cellSize/3;
			var marginY = cellSize/3;
			
			if(state==0||state==2){	//Left or Right
				marginX=0;
			}else if (state==1||state==3){	//Up or Down
				marginY=0;
			}

			//Eye 1
			ctx.drawImage(eyeImage,
				0,28*(counter%9),
				cellSize,cellSize,
				cellSize*snakeBody[i][0]+marginX, 
				cellSize*snakeBody[i][1]+marginY,
				cellSize, cellSize);
			
			//Eye 2
			ctx.drawImage(eyeImage,
				0,28*(counter%9),
				cellSize,cellSize,
				cellSize*snakeBody[i][0]-marginX, 
				cellSize*snakeBody[i][1]-marginY, 
				cellSize, cellSize);
		} 
	}

	//For movements

	var x = 0;
	var y = 0;

	switch (state) {
		case 0:

		x--;
		break;

		case 1:

		y--;
		break;

		case 2:

		x++;
		break;

		case 3:

		y++;
		break;

		default:

		break;
	}

	var first = snakeBody[0]; //Getting head

	var newHead = [first[0] + x, first[1] + y];

	newHead[0] = newHead[0] < 0 ? (n - ((-1)*newHead[0])%n) : newHead[0]%n;
	newHead[1] = newHead[1] < 0 ? (n - ((-1)*newHead[1])%n) : newHead[1]%n;

	snakeBody.splice(0, 0, newHead);	//Append at front

	if(!increaseLength) {	//But if not increased, we have to remove last, so the snake appears moving

		snakeBody.pop();
	}

}

setInterval(update , 100);


}

$(document).on('keydown', e => {

	if(e.keyCode == 32) {

		if(!started) {

			started= true;
			playGame();
		}
	}
})