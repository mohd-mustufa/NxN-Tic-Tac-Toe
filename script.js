const generateBoard = (n) => {
	const board = [];
	let table = document.getElementById("board");
	table.innerHTML = "";

	for (let row = 0; row < n; row++) {
		array = [];
		const tableRow = table.insertRow(row);
		for (let col = 0; col < n; col++) {
			cell = tableRow.insertCell(col);
			cell.setAttribute("row", row);
			cell.setAttribute("col", col);
			cell.classList.add("cell");
			array.push(cell);
		}
		board.push(array);
	}
};

const addAllEventListeners = () => {
	let selectedSize = 3;
	const boardSizeDropdown = document.getElementById("board-size-dropdown");
	boardSizeDropdown.addEventListener("change", () => {
		selectedSize = parseInt(boardSizeDropdown.value);
		generateBoard(selectedSize);
	});

	const resetBtn = document.getElementById("reset");
	resetBtn.addEventListener("click", () => generateBoard(selectedSize));
};

const startGame = () => {
	let turn = "x";
	generateBoard(3);
	addAllEventListeners();
};

startGame();
