import { words } from "./words.js";
import { GuardarDatos } from "./guardarDatos.js";

class Game {
  constructor() {
    this.userDataStorage = new GuardarDatos(localStorage, "user_data");
    this.userScoresStorage = new GuardarDatos(localStorage, "user_scores");
    this.globalScoreStorage = new GuardarDatos(
      localStorage,
      "global_best_score"
    );

    // Check login and get username
    const userData = this.userDataStorage.load();
    if (!userData) {
      window.location.href = "login.html";
      return;
    }
    this.currentUser = userData.user;

    this.words = [];
    this.activeWords = [];
    this.score = 0;
    this.lives = 3;
    this.spawnRate = 2000;
    this.fallSpeed = 2;
    this.gameLoopId = null;
    this.spawnIntervalId = null;
    this.isPlaying = false;

    // DOM Elements
    this.container = document.getElementById("game-container");
    this.input = document.getElementById("word-input");
    this.scoreEl = document.getElementById("score");
    this.livesEl = document.getElementById("lives");
    this.bestScoreEl = document.getElementById("best-score");
    this.globalBestScoreEl = document.getElementById("global-best-score");
    this.gameOverScreen = document.getElementById("game-over-screen");
    this.finalScoreEl = document.getElementById("final-score");
    this.finalBestScoreEl = document.getElementById("final-best-score");
    this.finalGlobalBestScoreEl = document.getElementById(
      "final-global-best-score"
    );
    this.restartBtn = document.getElementById("restart-btn");

    this.init();
  }

  init() {
    this.loadScores();
    this.setupEventListeners();
    this.startGame();
  }

  loadScores() {
    // Load Personal Best
    const allUserScores = this.userScoresStorage.load() || {};
    const personalBest = allUserScores[this.currentUser] || 0;
    this.bestScoreEl.textContent = personalBest;

    // Load Global Best
    const globalBest = this.globalScoreStorage.load() || {
      score: 0,
      user: "N/A",
    };
    this.globalBestScoreEl.textContent = `${globalBest.score} (${globalBest.user})`;
  }

  setupEventListeners() {
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.checkInput();
      }
    });

    this.restartBtn.addEventListener("click", () => {
      this.resetGame();
      this.startGame();
    });
  }

  startGame() {
    this.isPlaying = true;
    this.score = 0;
    this.lives = 3;
    this.spawnRate = 2000;
    this.fallSpeed = 2;
    this.activeWords = [];
    this.updateUI();

    this.gameOverScreen.classList.add("hidden");
    this.input.value = "";
    this.input.focus();

    this.spawnIntervalId = setInterval(() => this.spawnWord(), this.spawnRate);
    this.gameLoopId = requestAnimationFrame(() => this.gameLoop());
  }

  spawnWord() {
    if (!this.isPlaying) return;

    const wordText = words[Math.floor(Math.random() * words.length)];
    const wordEl = document.createElement("div");
    wordEl.classList.add("word");
    wordEl.textContent = wordText;

    // Random X position (keep within bounds)
    const maxX = this.container.clientWidth - 150; // Approximate width
    const x = Math.random() * maxX;

    wordEl.style.left = `${x}px`;
    wordEl.style.top = "-30px";

    // Click event for bonus points
    wordEl.addEventListener("click", () => {
      this.input.value = wordText;
      this.input.focus();
      this.input.dataset.bonus = "true"; // Mark for bonus
    });

    this.container.appendChild(wordEl);
    this.activeWords.push({ element: wordEl, text: wordText, y: -30 });

    // Increase difficulty
    if (this.spawnRate > 500) {
      clearInterval(this.spawnIntervalId);
      this.spawnRate -= 50;
      this.spawnIntervalId = setInterval(
        () => this.spawnWord(),
        this.spawnRate
      );
    }
  }

  gameLoop() {
    if (!this.isPlaying) return;

    this.activeWords.forEach((wordObj, index) => {
      wordObj.y += this.fallSpeed;
      wordObj.element.style.top = `${wordObj.y}px`;

      // Check collision with bottom
      if (wordObj.y > this.container.clientHeight) {
        this.removeWord(index);
        this.loseLife();
      }
    });

    // Increase fall speed slightly over time
    this.fallSpeed += 0.001;

    this.gameLoopId = requestAnimationFrame(() => this.gameLoop());
  }

  checkInput() {
    const text = this.input.value.trim().toLowerCase();
    const index = this.activeWords.findIndex((w) => w.text === text);

    if (index !== -1) {
      const isBonus = this.input.dataset.bonus === "true";
      const points = isBonus ? 2 : 1;

      this.score += points;
      this.removeWord(index);
      this.input.value = "";
      this.input.dataset.bonus = "false";
      this.updateUI();
    } else {
      // Optional: Visual feedback for wrong word
      this.input.style.borderColor = "red";
      setTimeout(() => (this.input.style.borderColor = "none"), 200);
    }
  }

  removeWord(index) {
    if (this.activeWords[index]) {
      this.activeWords[index].element.remove();
      this.activeWords.splice(index, 1);
    }
  }

  loseLife() {
    this.lives--;
    this.updateUI();
    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  updateUI() {
    this.scoreEl.textContent = this.score;
    this.livesEl.textContent = this.lives;
  }

  gameOver() {
    this.isPlaying = false;
    clearInterval(this.spawnIntervalId);
    cancelAnimationFrame(this.gameLoopId);

    // 1. Update Personal Best
    const allUserScores = this.userScoresStorage.load() || {};
    const currentPersonalBest = allUserScores[this.currentUser] || 0;

    if (this.score > currentPersonalBest) {
      allUserScores[this.currentUser] = this.score;
      this.userScoresStorage.save(allUserScores);
    }

    // 2. Update Global Best
    const globalBest = this.globalScoreStorage.load() || {
      score: 0,
      user: "N/A",
    };
    if (this.score > globalBest.score) {
      this.globalScoreStorage.save({
        score: this.score,
        user: this.currentUser,
      });
    }

    // Show Game Over screen
    this.finalScoreEl.textContent = this.score;
    this.finalBestScoreEl.textContent = Math.max(
      this.score,
      currentPersonalBest
    );

    const newGlobalBest = this.globalScoreStorage.load();
    this.finalGlobalBestScoreEl.textContent = `${newGlobalBest.score} (${newGlobalBest.user})`;

    this.gameOverScreen.classList.remove("hidden");

    // Clean up remaining words
    this.activeWords.forEach((w) => w.element.remove());
    this.activeWords = [];
  }

  resetGame() {
    this.activeWords.forEach((w) => w.element.remove());
    this.activeWords = [];
  }
}

// Start the game
new Game();
