
var grid;
var grid_new;
var score = 0;
setup();




// nouvelle partie
$('#new_game').on('click', function(){
	score = 0;
	setup();
});



function isGameOver()
{
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(grid[i][j] == 0){
				return false;
			}
			if(i != 3 && grid[i][j] == grid[i+1][j]){
				return false;
			}
			if(j != 3 && grid[i][j] == grid[i][j+1]){
				return false;
			}
		}
	}
	return true;
}

function isGameWon()
{
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(grid[i][j] == 2048){
				return true;
			}
		}
	}
	return false;
}

// Event Listeners
$(document).on('keyup', function(event){
	var flipped = false;
	var rotated = false;
	var played = true;
	var direction = "";
	
	if(event.which == 39){ 		// gauche
		// ne rien faire
		direction = "right";
	}
	else if(event.which == 37){ // droite
		grid = flipGrid(grid);
		flipped = true;
		direction = "left";
	}
	else if(event.which == 40){ // bas
		grid = rotateGrid(grid);
		rotated = true;
		direction = "bottom";
	}
	else if(event.which == 38){ // haut
		grid = rotateGrid(grid);
		grid = flipGrid(grid);
		rotated = true;
		flipped = true;
		direction = "top";
	}
	else{
		played = false;
	}

	if(played){
		var past = copyGrid(grid);
		grid = operate();
		var changed = compare(past, grid);

		if(flipped){
			grid = flipGrid(grid);
		}
		if(rotated){
			grid = rotateGrid(grid);
			grid = rotateGrid(grid);
			grid = rotateGrid(grid);
		}
		if(changed){
			addNumber();
			// animation du carré
			moveMap(direction);
		}

		displayMap(grid);

		var gameover = isGameOver();
		if(gameover){
			setTimeout(function(){
				alert("GAME OVER !!!");
				score = 0;
				setup();
			}, 1000);
			
		}

		var gamewon = isGameWon();
		if(gamewon){
			setTimeout(function(){
				alert("GAME WON !!!");
				score = 0;
				setup();
			}, 1000);
		}
	}
});

function moveMap(direction)
{
	var rng = Math.floor(Math.random() * 4);
	var sound = new Audio("audio/swipe"+rng+".mp3");
	sound.play();
	switch(direction){
		case 'left':
			$('#map_container').animate({'left': '-50px'}, 50);
			$('#map_container').animate({'left': '0px'}, 50);
			break;
		case 'top':
			$('#map_container').animate({'top': '-50px'}, 50);
			$('#map_container').animate({'top': '0px'}, 50);
			break;
		case 'right':
			$('#map_container').animate({'right': '-50px'}, 50);
			$('#map_container').animate({'right': '0px'}, 50);
			break;
		case 'bottom':
			$('#map_container').animate({'bottom': '-50px'}, 50);
			$('#map_container').animate({'bottom': '0px'}, 50);
			break;
	}
	$('#map_container').removeAttr('style');
}

function compare(a, b)
{
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(a[i][j] != b[i][j]){
				return true;
			}
		}
	}
	return false;
}

function operate()
{
	for (var i = 0; i < 4; i++) {
		grid[i] = slide(grid[i]);
		grid[i] = combine(grid[i]);
		grid[i] = slide(grid[i]);
	}
	return grid;
}

function setup()
{
	grid = blankGrid();
	grid_new = blankGrid();

	addNumber();
	addNumber();
	displayMap(grid);
}

function addNumber()
{
	// check les espaces libres
	var options = [];

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(grid[i][j] === 0){
				options.push({x: i, y: j});
			}
		}
	}

	if(options.length > 0){
		var spot = Math.floor(Math.random() * options.length);
		var r = Math.floor(Math.random() * 10);

		var number = 2
		if(r > 7){
			number = 4;
		}
		grid[[options[spot].x]][options[spot].y] = number;
		grid_new[[options[spot].x]][options[spot].y] = 1;
	}
}

function combine(row)
{
	for (var i = 3; i >= 1; i--) {
		var a = row[i];
		var b = row[i-1];
		if(a == b){
			row[i] = a + b;
			score += row[i];
			row[i-1] = 0;
			//break;
		}
	}

	return row;
}

function copyGrid(grid)
{
	var extra = blankGrid();

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			extra[i][j] = grid[i][j];
		}
	}
	return extra;
}

function slide(row)
{
	var arr = row.filter(val => val);
	var missing = 4 - arr.length;
	var zeros = Array(missing).fill(0);
	arr = zeros.concat(arr);

	return arr;
}

function displayMap(grid)
{
	$('#map_container').empty();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(grid[i][j] === 0){
				$('#map_container').append("<div class='cell'></div>");
			}
			else{
				var class_name = "cell val"+grid[i][j];
				if(grid_new[i][j] == 1){
					class_name += " new";
				}
				$('#map_container').append("<div class='"+class_name+"'>"+grid[i][j]+"</div>");
				grid_new[i][j] = 0;
			}
		}
	}

	$('#score').html(score);
}