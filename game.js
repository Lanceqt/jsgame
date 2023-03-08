"use strict";
const gameBoard = document.querySelector("#game-board");
const spriteObjects = ["coin", "bomb", "heart"];
const fragment = new DocumentFragment();
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
gameBoard.setAttribute("style", `width: ${windowWidth}px; height: ${windowHeight}px`);

function generateSprite(spriteType) {
    if (!spriteObjects.includes(spriteType)) {
        throw new Error(`${spriteType} is not a type of sprite`);
    }

    let spriteShape;

    switch (spriteType) {
        case "heart":
            spriteShape = "❤️";
            break;
        case "coin":
            spriteShape = "🪙";
            break;
        case "bomb":
            spriteShape = "💣";
            break;
    }

    return addElement("div", spriteShape, "sprite-universals");
}

function addElement(injectionType, content, cssClass) {
    const newElement = document.createElement(injectionType);
    newElement.classList.add(cssClass);
    newElement.innerText = content;
    gameBoard.appendChild(newElement);
    return newElement;
}

function generateRandomSprite(inputArray) {
    const randomIndex = Math.floor(Math.random() * inputArray.length);
    return inputArray[randomIndex];
}

//Note to self: DocumentFragment is for adding in sprites without reloading the entire DOM.
//testing
let num = 0;
while(num < 10) {
    num++;
    fragment.appendChild(generateSprite(generateRandomSprite(spriteObjects)));
}

addElement("div", "Start game", "menu");
addElement("div", "Options", "menu");
addElement("div", "Exit game", "menu");

gameBoard.appendChild(fragment);
const spriteClasses = document.querySelectorAll(".sprite-universals"); //Must be after sprites have been generated

//Note to self: Arrow function its like writing a function but in line instead of defining it on its own.
spriteClasses.forEach(element => {
    element.addEventListener("click", e => {
        console.log(e);
    });
});