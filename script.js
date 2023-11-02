const startGame = () => {
	xTurn = true;
	generateBoard(3);
	addEventListenersForBtns();
};

const generateBoard = (n) => {
	const board = [];
	let table = document.getElementById("board");
	table.innerHTML = "";

	for (let row = 0; row < n; row++) {
		array = [];
		const tableRow = table.insertRow(row);
		for (let col = 0; col < n; col++) {
			const cell = tableRow.insertCell(col);
			cell.setAttribute("row", row);
			cell.setAttribute("col", col);
			cell.classList.add("cell");
			array.push(cell);
		}
		board.push(array);
	}

	// Adding event listener for each cell
	addEventListenersForCells();
};

const addEventListenersForCells = () => {
	const cells = document.querySelectorAll(".cell");
	cells.forEach((cell) =>
		cell.addEventListener("click", handleClick, { once: true })
	);
};

const handleClick = (e) => {
	const cell = e.target;
	cell.innerText = xTurn ? "X" : "O";
	xTurn = !xTurn;
};

const addEventListenersForBtns = () => {
	let selectedSize = 3;
	const boardSizeDropdown = document.getElementById("board-size-dropdown");
	boardSizeDropdown.addEventListener("change", () => {
		selectedSize = parseInt(boardSizeDropdown.value);
		generateBoard(selectedSize);
	});

	const resetBtn = document.getElementById("reset");
	resetBtn.addEventListener("click", () => generateBoard(selectedSize));
};

startGame();
