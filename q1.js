const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 0
let matches = 0

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  matches++;
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  if (matches === 6) {
    alert("Hip hip horray, you win!")

  }
  else { resetBoard(); }

}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

var startButton = document.getElementById("start")
startButton.addEventListener("click", startGame);
var timer = document.getElementById("timer")
timer.innerHTML = "Your Time:" + count
var endButton = document.getElementById("end")
endButton.addEventListener("click", endGame);
var intervalId;

// timer


function addToCount() {
  count++
  timer.innerHTML = "Your Time:" + count
  console.log(count);
}

function startGame() {
  console.log("clicked")
  intervalId = setInterval(addToCount, 1000)
}

function endGame() {
  console.log("clicked")
  clearInterval(intervalId)

}


