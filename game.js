"use strict";
const gameBoard = document.querySelector("#game-board");
const spriteObjects = ["coin", "bomb", "heart"];
const fragment = new DocumentFragment();
const menuMusic = new Audio("menu.mp3");
const bombSound = new Audio("bomb.wav");
const pointSound = new Audio("point.mp3");
const lifeSound = new Audio("lifegain.mp3");
let stateController;

function generateSprite(spriteType) {
    let spriteShape;
    let spriteId;
    let uniqueId = crypto.randomUUID();

    switch(spriteType) {
        case "heart":
            spriteShape = "❤️";
            spriteId = uniqueId;
            break;
        case "coin":
            spriteShape = "🪙";
            spriteId = uniqueId;
            break;
        case "bomb":
            spriteShape = "💣";
            spriteId = uniqueId;
            break;
        default:
            throw new Error(`${spriteType} is not a type of sprite`);
    }

    return addElement("div", spriteShape, spriteId, "sprite-universals");
}

function addElement(injectionType, content, elementId, cssClass = 0) {
    const newElement = document.createElement(injectionType);
    newElement.classList.add(cssClass);
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

function generateRandomSprite(inputArray) {
    const randomIndex = Math.floor(Math.random() * inputArray.length);
    return inputArray[randomIndex];
}

function generateGameState() {
    function startingScreen() {
        addElement("h1", "Clicky boom game", "title",);
        addElement("div", "Welcome challenger - Press to play", "press-start", "welcome");
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
        addElement("div", "Start game", "start-game", "menu");
        addElement("div", "Options", "options", "menu");
        addElement("div", "Exit game", "exit-game", "menu");

        document.querySelector('[data-id="start-game"]').addEventListener("click", e =>{
            stateController = "gameScreen";
            generateGameState();
            console.log(stateController);
            console.log(e);
        });
        // document.querySelectorAll(".menu").forEach(element => {
        //     element.addEventListener("click", e => {
        //         console.log(e);
        //     });
        // });
    }

    function gameScreen() {
        let num = 0;
        console.log("game screen is run")
        console.log(num);
        removeElement('[data-id="title"]','[data-id="start-game"]', '[data-id="options"]', '[data-id="exit-game"]');

        while(num < 10) {
            num++;
            fragment.appendChild(generateSprite(generateRandomSprite(spriteObjects)));
            console.log(num);
        }
        document.querySelectorAll(".sprite-universals").forEach(element => {
            element.addEventListener("click", e => {
                console.log(e);
                pointSound.play();
            });
        });
        //Note to self: DocumentFragment is for adding in sprites without reloading the entire DOM.
        gameBoard.appendChild(fragment);
    }

    function gameOver() {
        addElement("h1", "GAME OVER!", "h1")
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

        case "options":
            options();
        default:
            startingScreen();
            break;
    }
}
generateGameState();