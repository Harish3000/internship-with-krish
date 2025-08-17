// --- Initialize ELEMENTS ---
const userInput = document.getElementById("userInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const output = document.getElementById("output");
const attemptsDisplay = document.getElementById("attempts");

// --- Initialize Variables ---
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const targetLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
let attempts = 0;

// debug
console.log("Target:", targetLetter);

// --- ALGORITHM ---
function handleGuess() {
  const guess = userInput.value.toLowerCase();

  // VALIDATION
  if (!guess || !alphabet.includes(guess)) {
    output.textContent = "Please enter a single letter from A to Z.";
    return;
  }

  // update total ATTEMPTS
  attempts++;
  attemptsDisplay.textContent = attempts;

  // calc DISTANCE of target to guess
  const targetIndex = alphabet.indexOf(targetLetter);
  const guessIndex = alphabet.indexOf(guess);
  const distance = Math.abs(targetIndex - guessIndex);

  if (distance === 0) {
    // --- WIN  ---
    output.innerHTML = `BINGO! 🎉 It was "${targetLetter.toUpperCase()}"! <br> <br> You got it in ${attempts} attempts.`;

    // Disable INPUTS AFTER WIN
    userInput.disabled = true;
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
  } else if (distance <= 3) {
    output.textContent = "Hot 🔥";
  } else if (distance <= 7) {
    output.textContent = "Warm ☀️";
  } else if (distance <= 13) {
    output.textContent = "Cool ❄️";
  } else {
    output.textContent = "Ice 🧊";
  }

  // CLEAR INPUT TO NEXT GAME
  userInput.value = "";
  userInput.focus();
}

// --- EVENT LISTENERS ---
guessBtn.addEventListener("click", handleGuess);

resetBtn.addEventListener("click", () => {
  location.reload();
});

// enter button feature.
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGuess();
  }
});
