"use strict";
const gameBoard = document.querySelector("#game-board");
const spriteObjects = ["coin", "bomb", "heart"];
const fragment = new DocumentFragment();

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

function addElement(injectionType, content, cssClass = 0) {
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

function removeSprite() {

}

//Note to self: DocumentFragment is for adding in sprites without reloading the entire DOM.
//testing
let num = 0;
while(num < 10) {
    num++;
    fragment.appendChild(generateSprite(generateRandomSprite(spriteObjects)));
}

addElement("h1", "Boom boom game");
// addElement("div", "Start game", "menu");
// addElement("div", "Options", "menu");
// addElement("div", "Exit game", "menu");
addElement("div", "Welcome challenger - Press to play", "welcome");


gameBoard.appendChild(fragment);

//Note to self: Arrow function its like writing a function but in line instead of defining it on its own.
document.querySelectorAll(".sprite-universals").forEach(element => {
    element.addEventListener("click", e => {
        console.log(e);
        parentEl
    });
});

document.querySelectorAll(".menu").forEach(element => {
    element.addEventListener("click", e => {
        console.log(e);
    });
});