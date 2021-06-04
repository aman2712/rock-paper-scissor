const main = document.getElementById("main");
var score = 0;

function openModal() {
  document.getElementById("modal").style.display = "grid";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function playGame(chosen) {
  main.classList.add("playing-game");
  main.innerHTML = `
    <div class='user-picked'>
    <p>YOU PICKED</p>
    <div class="${chosen} playing-${chosen}">
          <img src="./images/icon-${chosen}.svg" />
        </div>
    </div>
    <div class='house-picked' id='house-picked'>
    <p>THE HOUSE PICKED</p>
    <div class='empty-circle'>
    
    </div>
    </div>
  `;

  sleep(1000).then(() => {
    const randNum = Math.floor(Math.random() * 3) + 1;
    var chosenByComp;
    if (randNum === 1) {
      chosenByComp = "paper";
    } else if (randNum === 2) {
      chosenByComp = "scissor";
    } else if (randNum === 3) {
      chosenByComp = "rock";
    }
    if (window.innerWidth < 720) {
      main.style.marginTop = "2rem !important";
    }
    document.getElementById("house-picked").innerHTML = `
    <p>THE HOUSE PICKED</p>
    <div class='${chosenByComp} playing-${chosenByComp}'>
        <img src='./images/icon-${chosenByComp}.svg' />
    </div>
    `;
    sleep(1000).then(() => {
      var wonBy = findResult(chosen, chosenByComp);
      if (wonBy === "user") {
        score += 1;
      }
      document.getElementById("score").innerHTML = score;
      if (window.innerWidth < 720) {
        main.classList.remove("playing-game");
        main.classList.add("playing-game-mobile");
      }
      main.innerHTML = `
      ${
        window.innerWidth > 720
          ? `
      <div class='user-picked'>
      <p>YOU PICKED</p>
      <div class="${chosen} playing-${chosen}">
            <img src="./images/icon-${chosen}.svg" />
          </div>
      </div>
      <div class='result'>
        <h1 class='result-text'>${
          wonBy === "tie"
            ? "TIE!!"
            : wonBy === "comp"
            ? "YOU LOSE!"
            : "YOU WON!"
        }</h1>
        <button class='retry ${
          wonBy === "comp"
            ? "button-lose"
            : wonBy === "tie"
            ? "button-win"
            : "button-win"
        }' onClick='restartGame()'>PLAY AGAIN</button>
      </div>
      <div class='house-picked' id='house-picked'>
      <p>THE HOUSE PICKED</p>
    <div class='${chosenByComp} playing-${chosenByComp}'>
        <img src='./images/icon-${chosenByComp}.svg' />
    </div>
      </div>
      `
          : `
      <div class='for-mobile'>
      <div class='user-picked'>
      <p>YOU PICKED</p>
      <div class="${chosen} playing-${chosen}">
            <img src="./images/icon-${chosen}.svg" />
          </div>
      </div>
      <div class='house-picked' id='house-picked'>
      <p>THE HOUSE PICKED</p>
    <div class='${chosenByComp} playing-${chosenByComp}'>
        <img src='./images/icon-${chosenByComp}.svg' />
    </div>
      </div>
      </div>
      <div class='result'>
      <h1 class='result-text'>${
        wonBy === "tie" ? "TIE!!" : wonBy === "comp" ? "YOU LOSE!" : "YOU WON!"
      }</h1>
      <button class='retry ${
        wonBy === "comp"
          ? "button-lose"
          : wonBy === "tie"
          ? "button-win"
          : "button-win"
      }' onClick='restartGame()'>PLAY AGAIN</button>
    </div>
      `
      }
      `;

      if (window.innerWidth > 720) {
        main.classList.remove("playing-game");
        main.classList.add("playing-game-results");
      }
    });
  });
}

function findResult(chosen, chosenByComp) {
  if (chosen === chosenByComp) {
    wonBy = "tie";
  } else if (chosen === "rock") {
    if (chosenByComp === "paper") {
      wonBy = "comp";
    } else {
      wonBy = "user";
    }
  } else if (chosen === "paper") {
    if (chosenByComp == "scissor") {
      wonBy = "comp";
    } else {
      wonBy = "user";
    }
  } else if (chosen == "scissor") {
    if (chosenByComp == "rock") {
      wonBy = "comp";
    } else {
      wonBy = "user";
    }
  }

  return wonBy;
}

function restartGame() {
  main.innerHTML = `
  <div class="triangle">
        <div class="paper">
          <img src="./images/icon-paper.svg" onclick="playGame('paper')" />
        </div>
        <div class="scissor">
          <img src="./images/icon-scissor.svg" onclick="playGame('scissor')" />
        </div>
        <div class="rock">
          <img src="./images/icon-rock.svg" onclick="playGame('rock')" />
        </div>
      </div>
  `;
  main.classList.remove("playing-game-mobile");
  main.classList.remove("playing-game-results");
  main.classList.remove("playing-game");
  main.style.display = "flex";
  main.style.justifyContent = "center";
  main.style.alignItems = "center";
  main.style.width = "auto";
}
