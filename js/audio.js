/**
 * Audio objects for various game sounds.
 * @type {HTMLAudioElement}
 */

const menuMusic = new Audio("./sounds/menu.mp3");
const bombSound = new Audio("../sounds/bomb.wav");
const pointSound = new Audio("../sounds/point.mp3");
const lifeSound = new Audio("../sounds/lifegain.mp3");

/**
 * Plays the corresponding sound effect based on the sprite type.
 *
 * @function playSound
 * @param {string} spriteType - The type of sprite for which the sound effect should be played. Accepted values: "bomb", "point", "life".
 */
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
