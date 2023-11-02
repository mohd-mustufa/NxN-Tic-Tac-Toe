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

function addEventListenerForBoardSize() {
	const boardSizeDropdown = document.getElementById("board-size-dropdown");
	boardSizeDropdown.addEventListener("change", () => {
		const selectedNumber = boardSizeDropdown.value;
		generateBoard(parseInt(selectedNumber));
	});
}

const startGame = () => {
	generateBoard(3);
	addEventListenerForBoardSize();
};

startGame();
