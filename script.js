// Initializing variables
BOARD_SIZE = 3;
xTurn = true;
const winningMessage = document.getElementById("winningMessage");
const winningMessageText = document.querySelector(
	"[data-winning-message-text]"
);
const homepage = document.getElementById("homepage");
const container = document.getElementById("container");
const rules = document.getElementById("rules");
const playBtn = document.getElementById("play-btn");
const rulesBtn = document.getElementById("rules-btn");
const backToHomeBtn = document.getElementById("back-to-home");
const homeFromPlayBtn = document.getElementById("home-from-play");
const homeFromWinBtn = document.getElementById("homeButton");
const restartButton = document.getElementById("restartButton");
const boardSizeDropdown = document.getElementById("board-size-dropdown");

// Function to begin the game
const startGame = () => {
	winningMessage.classList.remove("show");
	winningMessageText.innerText = "";
	generateBoard(BOARD_SIZE);
	addEventListenersForBtns();
};

// Adding event listeners to btns
restartButton.addEventListener("click", startGame);
rulesBtn.addEventListener("click", () => {
	homepage.classList.remove("show");
	rules.classList.add("show");
});
backToHomeBtn.addEventListener("click", () => {
	rules.classList.remove("show");
	homepage.classList.add("show");
});
homeFromPlayBtn.addEventListener("click", () => {
	container.classList.remove("show");
	homepage.classList.add("show");
});
homeFromWinBtn.addEventListener("click", () => {
	winningMessage.classList.remove("show");
	winningMessageText.innerText = "";
	homepage.classList.add("show");
});
playBtn.addEventListener("click", () => {
	homepage.classList.remove("show");
	container.classList.add("show");
	BOARD_SIZE = 3;
	boardSizeDropdown.value = 3;
	startGame();
});

// Adds event listeners to the btns and board on the main page
const addEventListenersForBtns = () => {
	boardSizeDropdown.addEventListener("change", () => {
		BOARD_SIZE = parseInt(boardSizeDropdown.value);
		generateBoard(BOARD_SIZE);
	});

	const resetBtn = document.getElementById("reset");
	resetBtn.addEventListener("click", () => generateBoard(BOARD_SIZE));
};

// Generates the nxn board
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

// Add event listeners to each cell on the board
const addEventListenersForCells = () => {
	cells.forEach((cell) =>
		cell.addEventListener("click", handleClick, { once: true })
	);
};

// Checks for win/draw, if not either then swaps the turns
const handleClick = (e) => {
	const cell = e.target;
	const currentTurn = xTurn ? "X" : "O";
	cell.innerText = currentTurn;

	if (checkWin(currentTurn)) {
		console.log(currentTurn + " Wins");
		winningMessageText.innerText = `${xTurn ? "X" : "O"} Wins!`;
		winningMessage.classList.add("show");
	} else if (checkDraw()) {
		console.log("draw");
		winningMessageText.innerText = "Draw!";
		winningMessage.classList.add("show");
	} else {
		swapTurns();
	}
};

// Changes the turn from x to o and vice versa
const swapTurns = () => {
	xTurn = !xTurn;
};

// Checks if all the cells on the board are not empty to check for draw
const checkDraw = () => {
	return [...cells].every(
		(cell) => cell.innerHTML === "X" || cell.innerHTML === "O"
	);
};

// Checks if a player has won the game
const checkWin = (currentTurn) => {
	if (BOARD_SIZE === 3) {
		return checkWinFor3x3Board(BOARD_SIZE, currentTurn);
	} else {
		return checkWinForNxNBoard(BOARD_SIZE, currentTurn);
	}
};

// Does win check for a 3x3 board
const checkWinFor3x3Board = (n, currentTurn) => {
	// For a 3x3 board, check for 3 consecutive symbols in a row, column, or diagonal

	// Check for rows
	for (let i = 0; i < n * n; i += n) {
		if (checkLine(i, 1, n, currentTurn)) return true;
	}

	// Check for cols
	for (let i = 0; i < n; i++) {
		if (checkLine(i, n, n, currentTurn)) return true;
	}

	// Check the main diagonal
	if (checkLine(0, n + 1, n, currentTurn)) return true;

	// Check the other diagonal
	if (checkLine(2, 2, n, currentTurn)) return true;

	return false;
};

// Win check for nxn board
const checkWinForNxNBoard = (n, currentTurn) => {
	// For an nxn board, check for (n-1) consecutive symbols in a row, column, or diagonal

	// Check for rows
	for (let i = 0; i < n * n; i += n) {
		if (checkLine(i, 1, n - 1, currentTurn)) return true;
		if (checkLine(i + 1, 1, n - 1, currentTurn)) return true;
	}

	// Check for cols
	for (let i = 0; i < n; i++) {
		if (checkLine(i, n, n - 1, currentTurn)) return true;
		if (checkLine(i + n, n, n - 1, currentTurn)) return true;
	}

	// Check the main diagonal
	if (checkLine(0, n + 1, n - 1, currentTurn)) return true;
	if (checkLine(1, n + 1, n - 1, currentTurn)) return true;
	if (checkLine(n, n + 1, n - 1, currentTurn)) return true;
	if (checkLine(n + 1, n + 1, n - 1, currentTurn)) return true;

	// Check the other diagonal
	if (checkLine(n - 1, n - 1, n - 1, currentTurn)) return true;
	if (checkLine(n - 2, n - 1, n - 1, currentTurn)) return true;
	if (checkLine(n * 2 - 1, n - 1, n - 1, currentTurn)) return true;
	if (checkLine(n * 2 - 2, n - 1, n - 1, currentTurn)) return true;

	return false;
};

// Helper function for checkWin
const checkLine = (start, step, count, currentTurn) => {
	for (let i = 0; i < count; i++) {
		if (cells[start + i * step].innerText !== currentTurn) {
			return false; // Symbols in the line don't match
		}
	}
	return true; // All symbols in the line match
};

startGame();
