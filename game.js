"use strict";
const gameBoard = document.querySelector("#game-board");
const spriteObjects = ["coin", "bomb", "heart"];
const fragment = new DocumentFragment();
//Note to self: DocumentFragment is for adding in sprites without reloading the entire DOM.
const menuMusic = new Audio("menu.mp3");
const bombSound = new Audio("bomb.wav");
const pointSound = new Audio("point.mp3");
const lifeSound = new Audio("lifegain.mp3");
let stateController;
let lifeTotal = 5;

function generateSprite(spriteType) {
    let spriteShape;
    let randomPos = Math.floor(Math.random() * (2 - 95 + 1)) + 95;
    const spriteId = crypto.randomUUID();

    switch(spriteType) {
        case "heart":
            spriteShape = "❤️";
            break;
        case "coin":
            spriteShape = "🪙";
            break;
        case "bomb":
            spriteShape = "💣";
            break;
        default:
            throw new Error(`${spriteType} is not a type of sprite`);
    }
    return addElement("div", spriteShape, spriteId, "sprite-universals", "left", `${randomPos}vw`);
}

function generateRandomSprite(inputArray) {
    const randomIndex = Math.floor(Math.random() * inputArray.length);
    return inputArray[randomIndex];
}

function addElement(injectionType, content, elementId, cssClass, cssInlineProp, cssInlineValue) {
    let nullCssClass = cssClass ?? "default";
    let nullInlineProp = cssInlineProp ?? "default";
    let nullCssInlineValue = cssInlineValue ?? "default";

    const newElement = document.createElement(injectionType);
    newElement.classList.add(nullCssClass);
    newElement.style.setProperty(nullInlineProp, nullCssInlineValue);
    newElement.innerText = content;
    newElement.setAttribute("data-id", `${elementId}`);
    gameBoard.appendChild(newElement);
    return newElement;
}

function removeElement(...elementSelectors) {
    elementSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.remove();
        });
    });
}

function generateGameState() {
    function startingScreen() {
        fragment.appendChild(addElement("h1", "Clicky boom game", "title"));
        fragment.appendChild(addElement("div", "Welcome challenger - Press to play", "press-start", "welcome"));
        gameBoard.appendChild(fragment);
        //Note to self: Arrow function its like writing a function but in line instead of defining it on its own.
        //There is a difference with how the this JS function works in an arrow function VS normal function 
        //I am not sure I understand that exactly yet.
        document.querySelector(".welcome").addEventListener("click", e => {
            menuMusic.play();
            menuMusic.loop = true;
            stateController = "menuScreen";
            generateGameState();
        });
    }

    function menuScreen() {
        removeElement(".welcome");
        fragment.appendChild(addElement("div", "Start game", "start-game", "menu"));
        fragment.appendChild(addElement("div", "Exit game", "exit-game", "menu"));
        gameBoard.appendChild(fragment);

        document.querySelector('[data-id="start-game"]').addEventListener("click", e =>{
            stateController = "gameScreen";
            generateGameState();
        });

        document.querySelector('[data-id="exit-game"]').addEventListener("click", e =>{
            removeElement('[data-id="title"]', '[data-id="start-game"]', '[data-id="exit-game"]');
            stateController = "default";
            menuMusic.pause();
            generateGameState();
        });
    }

    function gameScreen() {
        let num = 0;
        let score = 0;
        let timeLeft = 60;

        setTimeout(() => {
            clearInterval(countdown);
            stateController = "gameOver";
            generateGameState();
        }, 61 * 1000);

        const lifeController = () => {
            if (lifeTotal === 0) {
                stateController = "gameOver";
                generateGameState();
            }
        };

        removeElement('[data-id="title"]','[data-id="start-game"]', '[data-id="exit-game"]');
        fragment.appendChild(addElement("div", `Time: ${timeLeft} `, "countdown", "countdown"));
        fragment.appendChild(addElement("div", `Score: ${score} / 1000`, "score", "score"));
        fragment.appendChild(addElement("div", `❤️ ❤️ ❤️ ❤️ ❤️`, "life-total", "life-total"));

        const countdown = setInterval(() => {
            timeLeft--;
            document.querySelector(`[data-id="countdown"]`).innerText = `Time: ${timeLeft}`;
        }, 1000);

        while(num < 20) {
            num++;
            fragment.appendChild(generateSprite(generateRandomSprite(spriteObjects)));
        }

        gameBoard.appendChild(fragment);
        function handleSpriteClick(event){
            const targetSprite = event.target;
            if (targetSprite.classList.contains("sprite-universals")) {
                let spriteUId = targetSprite.getAttribute("data-id");
                let spriteContent = document.querySelector(`[data-id="${spriteUId}"`);
                spriteContent = spriteContent.innerText;
                switch (spriteContent) {
                    case "❤️":
                        lifeSound.play();
                        break;
                    case "🪙":
                        pointSound.play();
                        break;
                    case "💣":
                        bombSound.play();
                        lifeTotal--;
                        console.log(lifeTotal);
                        lifeController();
                        break;
                    default:
                        console.log("default");
                }
                console.log(spriteContent);
                console.log(spriteUId);

                removeElement(`[data-id="${spriteUId}"`);
                const numberOfSprites = 2;

                for (let i = 0; i < numberOfSprites; i++) {
                    const newSprite = generateSprite(generateRandomSprite(spriteObjects));
                    fragment.appendChild(newSprite);
                }
                gameBoard.appendChild(fragment);
            }
        }
        gameBoard.addEventListener("click", handleSpriteClick);
    }

    function gameOver() {
        removeElement(`.sprite-universals`, `[data-id="life-total"]`, `[data-id="score"]`, `[data-id="countdown"]`);
        menuMusic.pause();
        addElement("h1", "GAME OVER!", "h1");
        // addElement(`div`, `Back to menu`, `back`, `welcome`);
        // document.querySelector(`[data-id="back"]`).addEventListener("click", e => {
        //     menuMusic.play();
        //     menuMusic.loop = true;
        //     removeElement(`[data-id="h1"]`, `[data-id="back"]`,);
        //     fragment.appendChild(addElement("h1", "Clicky boom game", "title"));
        //     stateController = "menuScreen";
        //     generateGameState();
        // });

    }    
    switch(stateController) {
        case "menuScreen":
            menuScreen();
            break;
        case "gameOver":
            gameOver();
            break;
        case "gameScreen":
            gameScreen();
            break;
        default:
            startingScreen();
            console.log(stateController);
            console.log("it went to default")
            break;
    }
}
generateGameState();