const targetColorBox = document.getElementById("target");
const colorOptions = document.getElementById("color-options");
const message = document.getElementById("message");
const newGameBtn = document.getElementById("new-game");
const scoreDisplay = document.getElementById("score");
let score = 0;

function generateShade(color, factor) {
  return color.map((channel) =>
    Math.max(0, Math.min(255, Math.floor(channel * factor)))
  );
}

function generateColor(base, variation = 10) {
  return base.map((channel) =>
    Math.max(
      0,
      Math.min(
        255,
        channel + Math.floor(Math.random() * variation * 2 - variation)
      )
    )
  );
}

function rgbToStr(rgb, opacity = 1) {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
}

function startGame() {
  message.textContent = ""; // Clear message

  // Generate base color
  let baseColor = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ];

  // Generate correct color with a small variation
  let targetColor = generateColor(baseColor, 10);
  targetColorBox.style.backgroundColor = rgbToStr(targetColor);
  targetColorBox.style.transform = "scale(1.2)";
  targetColorBox.textContent = "GUESS THE COLOR";
  targetColorBox.style.paddingTop = "20px";
  targetColorBox.style.color = "black";
  setTimeout(() => (targetColorBox.style.transform = "scale(1)"), 500);

  // Generate 3 dark shades (darker)
  let darkShades = [
    generateShade(targetColor, 0.9),
    generateShade(targetColor, 0.5),
    generateShade(targetColor, 0.2),
  ];

  // Generate 2 light shades (lighter)
  let lightShades = [
    generateShade(targetColor, 1.8),
    generateShade(targetColor, 1.0),
  ];

  // Create the 6 color options: 1 correct + 3 dark + 2 light
  let colors = [targetColor, ...darkShades, ...lightShades];
  colors.sort(() => Math.random() - 0.5); // Shuffle colors

  // Render buttons
  colorOptions.innerHTML = "";
  colors.forEach((color, index) => {
    let btn = document.createElement("button");
    btn.classList.add("color-btn");
    let opacity = index === 0 ? 1 : Math.random() * (0.9 - 0.6) + 0.6; // Random opacity for variation
    btn.style.backgroundColor = rgbToStr(color, opacity);
    btn.onclick = () => checkColor(color, targetColor);
    colorOptions.appendChild(btn);
  });
}

function checkColor(selectedColor, targetColor) {
  if (selectedColor.every((val, index) => val === targetColor[index])) {
    score++;
    scoreDisplay.textContent = score;
    message.textContent = getFeedbackMessage(score);
    message.style.color = "green";
    setTimeout(startGame, 700);
  } else {
    message.textContent = "Oops 😥, Try Again!";
    message.style.color = "red"
  }

  // Load new round after a short delay
  setTimeout(startGame, 700);
}

function getFeedbackMessage(score) {
  if (score < 5) return "Nice work! 🎉";
  if (score < 10) return "Keep going! 💪";
  return "Great job! 🎊";
}

newGameBtn.onclick = () => {
  score = 0;
  scoreDisplay.textContent = score;
  message.textContent = "";
  startGame();
};

startGame();
