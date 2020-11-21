let menu =
  '<div id="menuTab"><div class="menu"><h1 class="header">Four-In-A-Row!</h1><button class="menuButton" onclick="startGame(1)">One Player</button><br /><button class="menuButton" onclick="startGame(2)">Two Players</button></div></div>';

let columnsSpace;
let turns = ["red", "blue"];
let currentP = 0;
let counter = 0;
let mod;

init();

function insertPin(num) {
  if (counter == 49) {
    endGame("tie");
  } else if (mod == 2 && columnsSpace[num] > 0) {  //two players
    document.getElementById("r" + columnsSpace[num] + num).classList.add(turns[currentP]);
    isWin(columnsSpace[num], num);
    counter++;
    columnsSpace[num]--;
    currentP = (currentP + 1) % 2;
  }
  else if (mod == 1 && columnsSpace[num] > 0) {  //one player             
    document.getElementById("r" + columnsSpace[num] + num).classList.add(turns[currentP]);
    isWin(columnsSpace[num], num);
    counter++;
    columnsSpace[num]--;
    currentP = (currentP + 1) % 2;
    computerTurn(0);
  }
}

//computer's turn - for now only random
function computerTurn(level) {
  let rand = 1;
  rand = Math.floor((Math.random() * 7) + 1);
  setTimeout(() => {
  console.log(rand);
  while (containsC(1, rand) != 2) {
      rand = (int)((Math.random() * 6) + 1);
      console.log(rand);
  }

    document.getElementById("r" + columnsSpace[rand] + rand).classList.add(turns[currentP]);
    isWin(columnsSpace[rand], rand);
    counter++;
    columnsSpace[rand]--;
    currentP = (currentP + 1) % 2;
    }, 200);
}

//checks if current turn won
//using: checkH, checkV, checkOTL and checkOTR
function isWin(emptyRow, num) {
  if (
    checkH(emptyRow, num, 1) ||
    checkV(emptyRow, num, 1) ||
    checkOTL(emptyRow, num, 1) ||
    checkOTR(emptyRow, num, 1)
  ) {
    setTimeout(() => {
      let winnerP = (currentP + 1) % 2;
      let temp = localStorage.getItem(turns[winnerP] + "Rec");

      localStorage.setItem(turns[winnerP] + "Rec", parseInt(temp) + 1 + "");
      document.querySelector("." + turns[winnerP] + "Rec").textContent = localStorage.getItem(
        turns[winnerP] + "Rec"
      );
      endGame(turns[(currentP + 1) % 2]);
    }, 200);
  }
}

//checks horizontal win
function checkH(row, column, count) {
  let i = column;
  while (i < 7 && containsC(row, ++i) == currentP) {
    count++;
  }
  while (column > 1 && containsC(row, --column) == currentP) {
    count++;
  }
  if (4 <= count) {
    return true;
  }
  return false;
}

//checks vertical win
function checkV(row, column, count) {
  while (row < 7 && containsC(++row, column) == currentP) {
    count++;
  }
  if (4 <= count) {
    return true;
  }
  return false;
}

//checks diagonal to upper left corner win
function checkOTL(row, column, count) {
  let i = column;
  let j = row;
  while (i > 1 && j > 1 && containsC(--j, --i) == currentP) {
    count++;
  }
  while (row < 7 && column < 7 && containsC(++row, ++column) == currentP) {
    count++;
  }
  if (4 <= count) {
    return true;
  }
  return false;
}

//checks diagonal to upper right corner win
function checkOTR(row, column, count) {
  let i = column;
  let j = row;
  while (i < 7 && j > 1 && containsC(--j, ++i) == currentP) {
    count++;
  }
  while (row < 7 && column > 1 && containsC(++row, --column) == currentP) {
    count++;
  }
  if (4 <= count) {
    return true;
  }
  return false;
}

//checks if current box is red (0), blue (1) or empty (2)
function containsC(emptyRow, num) {
  if (document.getElementById("r" + emptyRow + num).classList.contains("red")) {
    return 0;
  }

  if (document.getElementById("r" + emptyRow + num).classList.contains("blue")) {
    return 1;
  }
  return 2;
}

//initialize 
function init() {
  currentP = 0;
  counter = 0;
  columnsSpace = [0,7,7,7,7,7,7,7];

  document.getElementById("n1").setAttribute("onclick", "insertPin(1)");
  document.getElementById("n2").setAttribute("onclick", "insertPin(2)");
  document.getElementById("n3").setAttribute("onclick", "insertPin(3)");
  document.getElementById("n4").setAttribute("onclick", "insertPin(4)");
  document.getElementById("n5").setAttribute("onclick", "insertPin(5)");
  document.getElementById("n6").setAttribute("onclick", "insertPin(6)");
  document.getElementById("n7").setAttribute("onclick", "insertPin(7)");

  for (let row = 1; row <= 7; row++) {
    for (let column = 1; column <= 7; column++) {
      document.getElementById("r" + row + column).classList.remove("red");
      document.getElementById("r" + row + column).classList.remove("blue");
    }
  }
  document.querySelector(".allMenu").insertAdjacentHTML("beforeend", menu);

  if (typeof Storage !== "undefined") {
    // Store
    if (localStorage.getItem("redRec") === null || localStorage.getItem("blueRec") === null) {
      localStorage.setItem("redRec", "0");
      localStorage.setItem("blueRec", "0");
    }
    // Retrieve
    document.querySelector(".redRec").textContent = localStorage.getItem("redRec");
    document.querySelector(".blueRec").textContent = localStorage.getItem("blueRec");
  } else {
    document.querySelector(".result").textContent =
      "Sorry, your browser does not support Web Storage...";
  }
}

//removes menu
function startGame(mode) {
  document.getElementById("menuTab").remove();
  mod = mode;
}

//announces the winner - turns buttons off
function endGame(winner) {
  document.getElementById("n1").setAttribute("onclick", "");
  document.getElementById("n3").setAttribute("onclick", "");
  document.getElementById("n4").setAttribute("onclick", "");
  document.getElementById("n2").setAttribute("onclick", "");
  document.getElementById("n5").setAttribute("onclick", "");
  document.getElementById("n6").setAttribute("onclick", "");
  document.getElementById("n7").setAttribute("onclick", "");
  let blue =
    '<div class="gameWinnerB" id="bW">Blue Player Has Won!!<button class="continue" onclick = "continueToMenu()">continue</button ></div >';
  let red =
    '<div class="gameWinnerR" id="rW">Red Player Has Won!!<button class="continue" onclick = "continueToMenu()">continue</button ></div >';

  let tie =
    '<div class="gameWinnerT" id="nW">No Winners!!<button class="continue" onclick = "continueToMenu()">continue</button ></div >';

  if (winner == "red") {
    document.querySelector(".annauncment").insertAdjacentHTML("beforeend", red);
  } else if (winner == "blue") {
    document.querySelector(".annauncment").insertAdjacentHTML("beforeend", blue);
  } else {
    document.querySelector(".annauncment").insertAdjacentHTML("beforeend", tie);
  }
}

//remove winner anouncmet and intialize
function continueToMenu() {
  if (document.body.contains(document.getElementById("bW"))) {
    document.getElementById("bW").remove();
  }

  if (document.body.contains(document.getElementById("rW"))) {
    document.getElementById("rW").remove();
  }

  if (document.body.contains(document.getElementById("nW"))) {
    document.getElementById("nW").remove();
  }
  init();
}
