// --------------- MEMORY GAME --------------- //

// --------------- GET PLAYER NAMES --------------- //

let playerOneName = prompt("Enter name of Player One.", "Harry Potter");
let playerTwoName = prompt("Enter name of Player Two.", "Ron Weasly");

if (playerOneName !== null) {
  const playerOneNameDiv = document.getElementById('playerOneName') as HTMLElement;
  playerOneNameDiv.innerText = playerOneName;
}

if (playerTwoName !== null) {
  const playerTwoNameDiv = document.getElementById('playerTwoName') as HTMLElement;
  playerTwoNameDiv.innerText = playerTwoName;
}

// --------------- SET UP GAME --------------- //

const appDiv = document.getElementById('app') as HTMLDivElement;

const numCards = 24; // total number of cards

// create new array with IDs for cards
let memoryCards: number[] = [];
for (let i=1; i<=numCards; i++) { memoryCards.push(i) };

// shuffle the array
memoryCards.sort(() => Math.random()-0.5 );

// fill board with cards
for (let i of memoryCards) {
  // create new div
  let newCard = document.createElement('div') as HTMLDivElement;
  // add class to div
  newCard.classList.add('memory__card');
  newCard.innerHTML = `<img src="/img/${i%12+1}.svg" id=${i} class="hidden" />`;
  newCard.addEventListener('click', () => handleClick(i));
  // append class to appDiv
  appDiv.appendChild(newCard);
}

// --------------- RUN GAME --------------- //

let firstCard: HTMLElement;
let secondCard: HTMLElement;
let showCounter = 0;    // counter for showing cards
let isShowing = false;  // var for keeping track of showing cards

// scoring functionality
let player = playerOneName;
let playerOneScore = 0;
let playerTwoScore = 0;


const playerTurnDiv = document.getElementById('playerTurn') as HTMLElement;
const playerOneScoreDiv = document.getElementById('playerOneScore') as HTMLElement;
const playerTwoScoreDiv = document.getElementById('playerTwoScore') as HTMLElement;
playerTurnDiv.innerText = typeof player === 'string' ? player : 'X';

// Make card visible on click
async function handleClick(id: number) {
  if (isShowing) { return }
  if (id.toString() === firstCard?.getAttribute('id')) { return }
  if (showCounter%2 === 0) {
    // first Card
    firstCard = document.getElementById(id.toString()) as HTMLElement;
    fancyRotate(firstCard);
  } else {
    // second Card
    secondCard = document.getElementById(id.toString()) as HTMLElement;
    fancyRotate(secondCard);
    isShowing = true;
    await delay(2000);
    checkMatch();
    isShowing = false;
  }
  showCounter++;
}

function fancyRotate(card: HTMLElement) {
  let degree = 0;
  let id = setInterval(frame, 5);
  function frame() {
    // end of animation
    if (degree === 360) { 
      clearInterval(id);
      card.classList.toggle('hidden');
    } else {
      // change style for animation
      degree += 5;
      card.parentElement!.style.rotate = `${degree}deg`;
    }
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// function to check if two cards have been a match
function checkMatch() {
  let firstId = Number(firstCard.id);
  let secondId = Number(secondCard.id);
  // check if firstCard and secondCard are a match
  if (Math.abs(firstId - secondId) === 12) {
    // if so: replace cards with a CHECK
    firstCard.parentElement!.innerHTML = "<img src='/img/check.svg' />"
    secondCard.parentElement!.innerHTML = "<img src='/img/check.svg' />"
    score();
  } else {
    // else: hide cards again
    firstCard.classList.toggle('hidden');
    secondCard.classList.toggle('hidden');
    player = player === playerOneName ? playerTwoName : playerOneName;
    playerTurnDiv.innerText = typeof player === 'string' ? player : 'X';
  }
}

function score() {
  switch (player) {
    case playerOneName:
      playerOneScore++;
      playerOneScoreDiv.innerText = playerOneScore.toString();
      break;
    case playerTwoName:
      playerTwoScore++;
      playerTwoScoreDiv.innerText = playerTwoScore.toString();
      break;
  }
}