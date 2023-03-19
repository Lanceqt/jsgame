import { gameBoard } from "./universals.js";
export function addElement(injectionType, content, elementId, cssClass, cssInlineProp, cssInlineValue) {
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

export function removeElement(...elementSelectors) {
    elementSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.remove();
        });
    });
}

