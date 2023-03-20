import { createElement, addToDOM } from "./elementHandlers.js";
const parentElement = document.querySelector("#game-board");
export const gameState = {
    state: "startingScreen",
    gameBoard: {},
    changeState(newState) {
        this.state = newState;
        this.gameBoard[newState]();
    },
};

const gameBoard = {
    async renderStartingScreen() {
        const title = await createElement("h1", "Clicky boom game", "title");
        const start = await createElement(
            "div",
            "Welcome challenger - Press to play",
            "start",
            "welcome"
        );
        addToDOM(parentElement, [title, start]);
        // fragment.appendChild(addElement("h1", "Clicky boom game", "title"));
        // fragment.appendChild(
        //     addElement("div", "Welcome challenger - Press to play", "press-start", "welcome")
        // );
        // gameBoard.appendChild(fragment);
        // //Note to self: Arrow function its like writing a function but in line instead of defining it on its own.
        // //There is a difference with how the this JS function works in an arrow function VS normal function
        // //I am not sure I understand that exactly yet.
        // document.querySelector(".welcome").addEventListener("click", (e) => {
        //     menuMusic.play();
        //     menuMusic.loop = true;
        // });
    },

    async renderMenuScreen() {
        const menuTitle = await createElement("h1", "menu", "title");
        addToDOM(parentElement, [menuTitle]);
        // removeElement(".welcome");
        // fragment.appendChild(addElement("div", "Start game", "start-game", "menu"));
        // fragment.appendChild(addElement("div", "Exit game", "exit-game", "menu"));
        // gameBoard.appendChild(fragment);
        // document.querySelector('[data-id="start-game"]').addEventListener("click", (e) => {});
        // document.querySelector('[data-id="exit-game"]').addEventListener("click", (e) => {
        //     removeElement('[data-id="title"]', '[data-id="start-game"]', '[data-id="exit-game"]');
        //     menuMusic.pause();
        // });
    },

    renderGameScreen() {
        // let num = 0;
        // let score = 0;
        // let timeLeft = 60;
        // setTimeout(() => {}, 61 * 1000);
        // const lifeController = () => {
        //     if (lifeTotal === 0) {
        //     }
        // };
        // removeElement('[data-id="title"]', '[data-id="start-game"]', '[data-id="exit-game"]');
        // fragment.appendChild(addElement("div", `Time: ${timeLeft} `, "countdown", "countdown"));
        // fragment.appendChild(addElement("div", `Score: ${score} / 1000`, "score", "score"));
        // fragment.appendChild(addElement("div", `❤️ ❤️ ❤️ ❤️ ❤️`, "life-total", "life-total"));
        // const countdown = setInterval(() => {
        //     timeLeft--;
        //     document.querySelector(`[data-id="countdown"]`).innerText = `Time: ${timeLeft}`;
        // }, 1000);
        // while (num < 20) {
        //     num++;
        //     fragment.appendChild(generateSprite(generateRandomSprite(spriteObjects)));
        // }
        // gameBoard.appendChild(fragment);
        // gameBoard.addEventListener("click", handleSpriteClick);
    },

    renderGameOver() {
        // removeElement(
        //     `.sprite-universals`,
        //     `[data-id="life-total"]`,
        //     `[data-id="score"]`,
        //     `[data-id="countdown"]`
        // );
        // menuMusic.pause();
        // addElement("h1", "GAME OVER!", "h1");
        // addElement(`div`, `Back to menu`, `back`, `welcome`);
        // clearTimeout();
        // document.querySelector(`[data-id="back"]`).addEventListener("click", (e) => {
        //     menuMusic.play();
        //     menuMusic.loop = true;
        //     removeElement(`[data-id="h1"]`, `[data-id="back"]`);
        //     fragment.appendChild(addElement("h1", "Clicky boom game", "title"));
        // });
    },
};
gameState.gameBoard = gameBoard;
