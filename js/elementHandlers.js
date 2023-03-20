import { isValidHtmlTag } from "./jsonParser.js";

export async function createElement(elementType, content, elementId, cssClass, cssInlineProp, cssInlineValue) {
    if(!await isValidHtmlTag(elementType)) {
        throw new Error(`elementType is required to create an element it is currently set to "${elementType}"`+
        ` it has to be a valid html tag`);
    };
    const newElement = document.createElement(elementType);

    Object.assign(newElement, {
        ...(content ? {textContent: content} : {}),
        ...(cssClass ? {className: cssClass} : {}),
        ...(cssInlineProp && cssInlineValue ? {style: {[cssInlineProp]:cssInlineValue}} : {})
    });
    if (elementId) {
        newElement.dataset.id = elementId;
    }
    console.log(newElement.outerHTML);
};

// export function addElement(injectionType, content, elementId, cssClass, cssInlineProp, cssInlineValue) {
//     let nullCssClass = cssClass ?? "default";
//     let nullInlineProp = cssInlineProp ?? "default";
//     let nullCssInlineValue = cssInlineValue ?? "default";

//     const newElement = document.createElement(injectionType);
//     newElement.classList.add(nullCssClass);
//     newElement.style.setProperty(nullInlineProp, nullCssInlineValue);
//     newElement.innerText = content;
//     newElement.setAttribute("data-id", `${elementId}`);
//     gameBoard.appendChild(newElement);
//     return newElement;
// }

// export function removeElement(...elementSelectors) {
//     elementSelectors.forEach(selector => {
//         document.querySelectorAll(selector).forEach(element => {
//             element.remove();
//         });
//     });
// }
