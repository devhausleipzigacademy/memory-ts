// --------------- MEMORY GAME --------------- //

const appDiv = document.getElementById('app') as HTMLDivElement;

const numCards = 24; // total number of cards

// fill board with cards
for (let i=0; i<numCards; i++) {
  // create new div
  let newCard = document.createElement('div') as HTMLDivElement;
  // add class to div
  newCard.classList.add('memory__card');
  // append class to appDiv
  appDiv.appendChild(newCard);
}