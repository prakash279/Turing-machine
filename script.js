var currentState = 'q0';
var tapePosition = 3;

function create_tape() {
  var input = document.getElementById("inputString").value;
  var tapeCells = ['', 'B', 'B', ...input.split(''), 'B', 'B', ''];
  var tapeTable = document.getElementById("tape");
  var cursorTable = document.getElementById("cursor");
  var resultElement = document.getElementById("result");

  tapeTable.innerHTML = '';
  cursorTable.innerHTML = '';

  for (var i = 0; i < tapeCells.length; i++) {
    var tapeCell = document.createElement('td');
    tapeCell.textContent = tapeCells[i];
    tapeTable.appendChild(tapeCell);

    var cursorCell = document.createElement('td');
    // cursorCell.textContent = (i === tapePosition) ? '⇨' : ''; // Cursor icon
    // cursorTable.appendChild(cursorCell);
    var cursorCell = document.createElement('td');
    if (i === tapePosition) {
      cursorCell.innerHTML = '⇨'; // Up arrow symbol
    } else {
      cursorCell.textContent = ''; // Empty cell
    }
    cursorTable.appendChild(cursorCell);
  }

  // Create the Increment button
  var incrementButton = document.createElement('button');
  incrementButton.textContent = "Perform 1's complement";
  incrementButton.onclick = performIncrement;
  resultElement.innerHTML = ''; // Clear previous results
  resultElement.appendChild(incrementButton);
}


var tapeCells;

function performIncrement() {
  tapeCells = document.getElementById("tape").getElementsByTagName("td");
  moveRight();
}

function moveRight() {
  if (tapePosition < tapeCells.length && tapeCells[tapePosition].textContent !== 'B') {
    updateCursor(tapePosition + 1);
    setTimeout(moveRight, 600); // Move to the right with a 1-second delay
  } else {
    moveLeft();
  }
}

function moveLeft() {
  if( tapePosition === 2){
    updateCursor(tapePosition+1);
  }
  if (tapePosition > 0 && tapeCells[tapePosition - 1].textContent !== 'B') {
    updateCell(tapePosition - 1);
    updateCursor(tapePosition - 1);
    setTimeout(moveLeft, 800); // Move to the left with a 1-second delay
  } else if (tapePosition > 0) {
    updateCell(tapePosition - 1);
    updateCursor(tapePosition - 1);
    setTimeout(moveLeft, 800); // Move to the left with a 1-second delay
  } else {
    updateCell(0);
    updateCursor(0);
  }
}

function updateCell(position) {
  if (tapeCells[position].textContent === '0') {
    tapeCells[position].textContent = '1';
  } else if (tapeCells[position].textContent === '1') {
    tapeCells[position].textContent = '0';
  }
}


function updateCursor(position) {
  var cursorTable = document.getElementById("cursor");
  cursorTable.innerHTML = ''; // Clear previous cursor position

  for (var i = 0; i < tapeCells.length; i++) {
    var cursorCell = document.createElement('td');
    cursorCell.textContent = (i === position) ? '⇨' : ''; // Cursor icon
    cursorTable.appendChild(cursorCell);
  }

  tapePosition = position;
}
