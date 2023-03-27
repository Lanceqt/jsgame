import { createElement, addToDOM } from "./elementHandlers.js";
import { playSound } from "./audio.js";
const spriteObjects = ["coin", "bomb", "heart"];

export const spriteTypes = {
    heart: "❤️",
    coin: "🪙",
    bomb: "💣",
};

export const sprites = {
    heart: {
        shape: spriteTypes.heart,
        onClick: (event) => {
            playSound("heart");
            event.target.remove();
        },
    },
    coin: {
        shape: spriteTypes.coin,
        onClick: (event) => {
            playSound("coin");
            event.target.remove();
        },
    },
    bomb: {
        shape: spriteTypes.bomb,
        onClick: (event) => {
            playSound("bomb");
            event.target.remove();
        },
    },
};

// export function generateSprite(spriteType) {
//     let spriteShape;
//     let randomPos = Math.floor(Math.random() * (2 - 95 + 1)) + 95;
//     const spriteId = crypto.randomUUID();
//     switch (spriteType) {
//         case "heart":
//             spriteShape = "❤️";
//             break;
//         case "coin":
//             spriteShape = "🪙";
//             break;
//         case "bomb":
//             spriteShape = "💣";
//             break;
//         default:
//             throw new Error(`${spriteType} is not a type of sprite`);
//     }
//     return addElement("div", spriteShape, spriteId, "sprite-universals", "left", `${randomPos}vw`);
// }

// export function generateRandomSprite(inputArray) {
//     const randomIndex = Math.floor(Math.random() * inputArray.length);
//     return inputArray[randomIndex];
// }

// export function handleSpriteClick(event) {
//     const targetSprite = event.target;
//     if (targetSprite.classList.contains("sprite-universals")) {
//         let spriteUId = targetSprite.getAttribute("data-id");
//         let spriteContent = document.querySelector(`[data-id="${spriteUId}"`);
//         spriteContent = spriteContent.innerText;
//         switch (spriteContent) {
//             case "❤️":
//                 lifeSound.play();
//                 break;
//             case "🪙":
//                 pointSound.play();
//                 break;
//             case "💣":
//                 bombSound.play();
//                 lifeTotal--;
//                 lifeController();
//                 break;
//             default:
//                 console.log("default");
//         }

//         removeElement(`[data-id="${spriteUId}"`);
//         const numberOfSprites = 2;
//         if (lifeTotal === 0) {
//             clearInterval(countdown);
//             return;
//         }
//         for (let i = 0; i < numberOfSprites; i++) {
//             const newSprite = generateSprite(generateRandomSprite(spriteObjects));
//             fragment.appendChild(newSprite);
//         }
//         gameBoard.appendChild(fragment);
//     }
// }
