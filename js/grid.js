function blankGrid()
{
	return [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
}

function flipGrid(grid)
{
	for(var i = 0; i < 4; i++){
		grid[i].reverse();
	}
	return grid;
}

function rotateGrid(grid)
{
	var new_grid = blankGrid();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			new_grid[i][j] = grid[j][i];
		}
	}
	return new_grid;
}