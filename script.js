xTurn = true;
BOARD_SIZE = 3;
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const startGame = () => {
	generateBoard(BOARD_SIZE);
	addEventListenersForBtns();
};

const generateBoard = (n) => {
	xTurn = true;
	const board = [];
	let table = document.getElementById("board");
	table.innerHTML = "";

	for (let row = 0; row < n; row++) {
		array = [];
		const tableRow = table.insertRow(row);
		for (let col = 0; col < n; col++) {
			const cell = tableRow.insertCell(col);
			cell.classList.add("cell");
			cell.setAttribute("row", row);
			cell.setAttribute("col", col);
			array.push(cell);
		}
		board.push(array);
	}

	// Adding event listener for each cell
	cells = document.querySelectorAll(".cell");
	addEventListenersForCells();
};

const addEventListenersForCells = () => {
	cells.forEach((cell) =>
		cell.addEventListener("click", handleClick, { once: true })
	);
};

const handleClick = (e) => {
	const cell = e.target;
	const currentTurn = xTurn ? "X" : "O";
	cell.innerText = currentTurn;

	if (checkWin(currentTurn)) {
		// do something
		console.log(currentTurn + " Wins");
	} else if (checkDraw()) {
		// do something else
		console.log("draw");
	} else {
		swapTurns();
	}
};

const swapTurns = () => {
	xTurn = !xTurn;
};

// const checkWin = (currentTurn) => {
// 	if (BOARD_SIZE === 3) {
// 		return WINNING_COMBINATIONS.some((combination) => {
// 			return combination.every((index) => {
// 				return cells[index].innerText.includes(currentTurn);
// 			});
// 		});
// 	} else {
// 		return nSizeBoardWinCheck(currentTurn);
// 	}
// };

// const nSizeBoardWinCheck = (currentTurn) => {
// n = cells.length;
// for (let i = 0; i < 2; i++) {
// 	for (let row = i; row < BOARD_SIZE - 1 + i; row++) {
// 		for (let col = i; col < BOARD_SIZE - 1 + i; col++) {
// 			// if (cells[])
// 		}
// 	}
// }
// };

// function checkWin(currentTurn) {
// 	if (BOARD_SIZE === 3) {
// 		// For a 3x3 board, check for 3 consecutive symbols in a row, column, or diagonal
// 		for (let i = 0; i < BOARD_SIZE; i++) {
// 			if (!checkLine(i, 0, 1, 0, currentTurn)) return false;
// 			if (!checkLine(0, i, 0, 1, currentTurn)) return false;
// 		}
// 		if (!checkLine(0, 0, 1, 1, currentTurn)) return false; // Check the main diagonal
// 		if (!checkLine(0, 2, 1, -1, currentTurn)) return false; // Check the other diagonal
// 		return true;
// 		// return (
// 		// 	checkLine(0, 0, 1, 0) || // Check the first row
// 		// 	checkLine(1, 0, 1, 0) || // Check the second row
// 		// 	checkLine(2, 0, 1, 0) || // Check the third row
// 		// 	checkLine(0, 0, 0, 1) || // Check the first column
// 		// 	checkLine(0, 1, 0, 1) || // Check the second column
// 		// 	checkLine(0, 2, 0, 1) || // Check the third column
// 		// );
// 	} else {
// 		// For an n x n board, check for (n-1) consecutive symbols in a row, column, or diagonal
// 		for (let i = 0; i < BOARD_SIZE; i++) {
// 			if (
// 				checkLine(i, 0, 0, 1) || // Check columns
// 				checkLine(0, i, 1, 0)
// 			) {
// 				return true;
// 			}
// 		}
// 		// Check diagonals
// 		return (
// 			checkLine(0, 0, 1, 1) || // Check the main diagonal
// 			checkLine(0, n - 1, 1, -1) // Check the other diagonal
// 		);
// 	}
// }

function checkWin(currentTurn) {
	let n = BOARD_SIZE;
	if (n === 3) {
		// For a 3x3 board, check for 3 consecutive symbols in a row, column, or diagonal

		// Check for rows
		for (let i = 0; i < n * n; i += n) {
			// console.log("checking for rows");
			if (checkLine(i, 1, n, currentTurn)) return true;
		}

		// Check for cols
		for (let i = 0; i < n; i++) {
			// console.log("checking for cols");
			if (checkLine(i, n, n, currentTurn)) return true;
		}

		// Check the main diagonal
		// console.log("checking for main diag");
		if (checkLine(0, n + 1, n, currentTurn)) return true;

		// Check the other diagonal
		// console.log("checking for other diag");
		if (checkLine(2, 2, n, currentTurn)) return true;

		return false;
	} else {
		// For an nxn board, check for (n-1) consecutive symbols in a row, column, or diagonal

		// Check for rows
		for (let i = 0; i < n * n; i += n) {
			// console.log("checking for rows in n x n");
			if (checkLine(i, 1, n - 1, currentTurn)) return true;
			if (checkLine(i + 1, 1, n - 1, currentTurn)) return true;
		}

		// Check for cols
		for (let i = 0; i < n; i++) {
			// console.log("checking for cols in n x n");
			if (checkLine(i, n, n - 1, currentTurn)) return true;
			if (checkLine(i + n, n, n - 1, currentTurn)) return true;
		}

		// Check the main diagonal
		// console.log("checking for main diag in n x n");
		if (checkLine(0, n + 1, n - 1, currentTurn)) return true;
		if (checkLine(1, n + 1, n - 1, currentTurn)) return true;
		if (checkLine(n, n + 1, n - 1, currentTurn)) return true;
		if (checkLine(n + 1, n + 1, n - 1, currentTurn)) return true;

		// Check the other diagonal
		// console.log("checking for other diag in n x n");
		if (checkLine(n - 1, n - 1, n - 1, currentTurn)) return true;
		if (checkLine(n - 2, n - 1, n - 1, currentTurn)) return true;
		if (checkLine(n * 2 - 1, n - 1, n - 1, currentTurn)) return true;
		if (checkLine(n * 2 - 2, n - 1, n - 1, currentTurn)) return true;

		return false;
	}
}

function checkLine(start, step, count, currentTurn) {
	// console.log("inside checkline");
	for (let i = 0; i < count; i++) {
		if (cells[start + i * step].innerText !== currentTurn) {
			// console.log(start + " " + step + " returning false");
			return false; // Symbols in the line don't match
		}
	}
	// console.log(start + " " + step + " returning true");
	return true; // All symbols in the line match
}

// function checkLine(x, y, dx, dy, currentTurn) {
// 	for (let i = 0; i < BOARD_SIZE; i++) {
// console.log(x + i * dx, y + i * dy);
// 		if (cells[x + i * dx][y + i * dy] !== currentTurn) {
// 			return false; // Symbols in the line don't match
// 		}
// 	}
// 	return true; // All symbols in the line match
// }

const checkDraw = () => {
	return [...cells].every(
		(cell) => cell.innerHTML === "X" || cell.innerHTML === "O"
	);
};

const addEventListenersForBtns = () => {
	const boardSizeDropdown = document.getElementById("board-size-dropdown");
	boardSizeDropdown.addEventListener("change", () => {
		BOARD_SIZE = parseInt(boardSizeDropdown.value);
		generateBoard(BOARD_SIZE);
	});

	const resetBtn = document.getElementById("reset");
	resetBtn.addEventListener("click", () => generateBoard(BOARD_SIZE));
};

startGame();
