		
		function MinesweeperController($scope) {
			
			$scope.start = function(){
				var mines = angular.element(document.getElementById("mines")).val();
				var width = angular.element(document.getElementById("width")).val();
				var height = angular.element(document.getElementById("height")).val();
				$scope.youWonMessage = false;
				$scope.youLostMessage = false;
				$scope.flags_cnt = mines;
				if (width == 0)
					width = 9;
				if (height == 0)
					height = 9;		
				if ($scope.minefield)
					$scope.minefield = null;
				$scope.minefield = createMinefield(mines, width, height);
				
				$scope.superman = function (minefield){
					for(var i = 0; i < height; i++) {				
						for(var j = 0; j < width; j++) {
							if (!minefield.rows[i].cells[j].superman)
								minefield.rows[i].cells[j].superman = true;
							else
								minefield.rows[i].cells[j].superman = false;
						}
					}				
				}		
				
				$scope.clickCell = function(minefield, cell){
								
					if (window.event.shiftKey == true){
						if (!cell.isCovered)
							return;						
						if (cell.flag == true){
							cell.flag = false;	
							$scope.flags_cnt = this.flags_cnt +1;
							return;
						}						
						if ($scope.flags_cnt <= 0){
							alert("you dont have any more flags")
							return;
						}						
						cell.flag = true;
						$scope.flags_cnt = this.flags_cnt -1;
						if(youWon($scope.minefield)){
							$scope.youWonMessage = true;
							return;
						}
						}
					if (cell.flag == true)
						return;
					cell.isCovered = false; 				
					if (cell.content == "mine")
						$scope.youLostMessage = true;				
					if (cell.content == "empty")
						revealAdjacentCells(cell.x, cell.y, minefield, width, height);
							   
				}
			}
		}
		
		function createMinefield(mines, width, height) {
			var minefield = {};
			minefield.rows = [];
		
			for(var i = 0; i < height; i++) {
				var row = {};
				row.cells = [];
				
				for(var j = 0; j < width; j++) {
					var cell = {};
					cell.isCovered = true;
					cell.content = "empty";
					cell.x=i;
					cell.y=j;
					row.cells.push(cell);
				}
				
				minefield.rows.push(row);
			}
			placeManyRandomMines(minefield, mines, width, height);
			calculateAllNumbers(minefield, width, height);			
			
			return minefield;
		}				

		function getCell(minefield, row, column) {
			return minefield.rows[row].cells[column];
		}		
		
		function placeRandomMine(minefield, width, height) {
			var row = Math.floor(Math.random() * height);
			var column = Math.floor(Math.random() * width);
			var cell = getCell(minefield, row, column);
			cell.content = "mine";
		}				
		
		function placeManyRandomMines(minefield, mines, width, height) {
			for(var i = 0; i < mines; i++) {
				placeRandomMine(minefield, width, height);
			}
		}
		
		function calculateAllNumbers(minefield, width, height) {
			for(var y = 0; y < height; y++) {
				for(var x = 0; x < width; x++) {
					calculateNumber(minefield, y, x, width, height);
				}
			}
		}			

		function calculateNumber(minefield, row, column, width, height) {
			var thisCell = getCell(minefield, row, column);
			
			// if this cell contains a mine then we can't place a number here
			if(thisCell.content == "mine") {
				return;
			}
			
			var mineCount = 0;

			// check row above if this is not the first row
			if(row > 0) {
				// check column to the left if this is not the first column
				if(column > 0) {
					// get the cell above and to the left
					var cell = getCell(minefield, row - 1, column - 1);
					if(cell.content == "mine") {
						mineCount++;
					}
				}

				// get the cell right above
				var cell = getCell(minefield, row - 1, column);
				if(cell.content == "mine") {
					mineCount++;
				}

				// check column to the right if this is not the last column
				if(column < (width-1)) {
					// get the cell above and to the right
					var cell = getCell(minefield, row - 1, column + 1);
					if(cell.content == "mine") {
						mineCount++;
					}
				}
			}

			// check column to the left if this is not the first column
			if(column > 0) {
				// get the cell to the left
				var cell = getCell(minefield, row, column - 1);
				if(cell.content == "mine") {
					mineCount++;
				}
			}
			
			// check column to the right if this is not the last column
			if(column < (width-1)) {
				// get the cell to the right
				var cell = getCell(minefield, row, column + 1);
				if(cell.content == "mine") {
					mineCount++;
				}
			}

			// check row below if this is not the last row
			if(row < (height-1)) {
				// check column to the left if this is not the first column
				if(column > 0) {
					// get the cell below and to the left
					var cell = getCell(minefield, row + 1, column - 1);
					if(cell.content == "mine") {
						mineCount++;
					}
				}

				// get the cell right below
				var cell = getCell(minefield, row + 1, column);
				if(cell.content == "mine") {
					mineCount++;
				}

				// check column to the right if this is not the last column
				if(column < (width-1)) {
					// get the cell below and to the right
					var cell = getCell(minefield, row + 1, column + 1);
					if(cell.content == "mine") {
						mineCount++;
					}
				}
			}
			
			if(mineCount > 0) {
				thisCell.content = mineCount;
			}
		}	
		
		  function revealAdjacentCells(i, j, minefield, width, height) {
			revealCell(i - 1, j - 1, minefield, width, height);
			revealCell(i - 1, j, minefield, width, height);
			revealCell(i - 1, j + 1, minefield, width, height);
			revealCell(i, j - 1, minefield, width, height);
			revealCell(i, j, minefield, width, height);
			revealCell(i, j + 1, minefield, width, height);
			revealCell(i + 1, j - 1, minefield, width, height);
			revealCell(i + 1, j, minefield, width, height);
			revealCell(i + 1, j + 1, minefield, width, height);
		  }

		  function revealCell(i, j, minefield, width, height) {
			if (i < 0 || j < 0 || i >=width || j>=height )
			  return;
			
			
			if (!minefield.rows[i].cells[j].isCovered || minefield.rows[i].cells[j].content == "mine")
				return;
			
			minefield.rows[i].cells[j].isCovered = false;
				if (minefield.rows[i].cells[j].content == "empty") {
				  revealAdjacentCells(i, j, minefield, width, height);
				}
		  }  
		
		function youWon(minefield) {
			for(var y = 0; y < 9; y++) {
				for(var x = 0; x < 9; x++) {
					var cell = getCell(minefield, y, x);
					if((cell.isCovered && cell.content != "mine") || (!cell.flag && cell.isCovered)) {
						return false;
					}
				}
			}
			
			return true;
		}		
	
