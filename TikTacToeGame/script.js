let array = Array(9).fill(null);
let turn = "X";
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let counter = 9;

function clicked(e) {
  counter--;
  if (turn === "X" && e.target.innerHTML === "") {
    array[e.target.id] = turn;
    document.getElementById(e.target.id).innerHTML = turn;
    turn = "O";
    document.getElementById("turn").innerHTML = `It's ${turn}'s turn`;
  } else if (turn === "O" && e.target.innerHTML === "") {
    array[e.target.id] = turn;
    document.getElementById(e.target.id).innerHTML = turn;
    turn = "X";
    document.getElementById("turn").innerHTML = `It's ${turn}'s turn`;
  }
  for (i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (array[a] && array[a] === array[b] && array[a] === array[c]) {
      if (document.getElementById("winner").innerHTML === "") {
        document.getElementById("winner").innerHTML = `Winner is ${array[a]}`;
        for (i = 0; i < 9; i++) {
          if (document.getElementById(i).innerHTML === "") {
            document.getElementById(i).innerHTML = "-";
          }
        }
      }else if(counter === 0) {
    document.getElementById("winner").innerHTML = "No Winner :(";
  }
    }
  }
}

function reset() {
  counter = 9;
  turn = "X";
  document.getElementById("turn").innerHTML = `it's ${turn}'s turn`;
  for (i = 0; i < 9; i++) {
    document.getElementById(i).innerHTML = "";
    array[i] = null;
  }
  document.getElementById("winner").innerHTML = "";
}
