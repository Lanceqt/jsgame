const menuMusic = new Audio("./sounds/menu.mp3");
const bombSound = new Audio("../sounds/bomb.wav");
const pointSound = new Audio("../sounds/point.mp3");
const lifeSound = new Audio("../sounds/lifegain.mp3");

export function playSound(spriteType) {
    switch (spriteType) {
        case "bomb":
            bombSound.play();
            break;
        case "point":
            pointSound.play();
            break;
        case "life":
            lifeSound.play();
            break;
        default:
            console.log("default");
    }
}
