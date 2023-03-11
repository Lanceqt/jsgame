"use strict";
const gameBoard = document.querySelector("#game-board");
const spriteObjects = ["coin", "bomb", "heart"];
const fragment = new DocumentFragment();
const menuMusic = new Audio("menu.mp3");
const bombSound = new Audio("bomb.wav");
const pointSound = new Audio("point.mp3");
const lifeSound = new Audio("lifegain.mp3");
let stateController = "";


function generateSprite(spriteType) {
    if (!spriteObjects.includes(spriteType)) {
        throw new Error(`${spriteType} is not a type of sprite`);
    }

    let spriteShape;

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
            throw new Error("I don't know how we got here that should not be possible");
    }

    return addElement("div", spriteShape, "sprite-universals");
}

function addElement(injectionType, content, cssClass = 0) {
    const newElement = document.createElement(injectionType);
    newElement.classList.add(cssClass);
    newElement.innerText = content;
    gameBoard.appendChild(newElement);
    return newElement;
}

function removeElement(elementSelector) {
    document.querySelector(elementSelector).remove();
}

function generateRandomSprite(inputArray) {
    const randomIndex = Math.floor(Math.random() * inputArray.length);
    return inputArray[randomIndex];
}

function generateGameState() {
    function startingScreen() {
        addElement("h1", "Clicky boom game", "h1");
        addElement("div", "Welcome challenger - Press to play", "welcome");
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
        addElement("div", "Start game", "menu");
        addElement("div", "Options", "menu");
        addElement("div", "Exit game", "menu");
        document.querySelectorAll(".menu").forEach(element => {
            element.addEventListener("click", e => {
                console.log(e);
            });
        });
    }

    function gameScreen() {
        let num = 0;
        while(num < 10) {
            num++;
            fragment.appendChild(generateSprite(generateRandomSprite(spriteObjects)));
        }
        document.querySelectorAll(".sprite-universals").forEach(element => {
            element.addEventListener("click", e => {
                console.log(e);
                pointSound.play();
            });
        });
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
        default:
            startingScreen();
            break;
    }
}

generateGameState();

//Note to self: DocumentFragment is for adding in sprites without reloading the entire DOM.
gameBoard.appendChild(fragment);