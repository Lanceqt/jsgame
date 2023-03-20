import { isValidHtmlTag } from "./jsonParser.js";

export async function createElement(elementType, content, elementId, CSSClass, CSSInlineProp, CSSInlineValue) {
    if(!await isValidHtmlTag(elementType)) {
        throw new Error(`elementType is required to create an element it is currently set to "${elementType}"`+
        ` it has to be a valid html tag`);
    };
    const newElement = document.createElement(elementType);

    // ...(if condition is true then {propertyName: value} else {})
    // ...(condition ? {propertyName: value} else {empty object})
    Object.assign(newElement, {
        ...(content ? {innerText: content} : {}),
        ...(CSSClass ? {className: CSSClass} : {}),
        ...(CSSInlineProp && CSSInlineValue ? {style: {[CSSInlineProp]:CSSInlineValue}} : {})
    });
    if (elementId) {newElement.dataset.id = elementId};
    // console.log(newElement.outerHTML);
    return newElement;
};

export function addToDOM(parentElement, childElement){
    const fragment = new DocumentFragment();

    childElement.forEach(childElement => {
        fragment.appendChild(childElement);
    });
    
    parentElement.appendChild(fragment);
};

export function removeElement(...elementSelectors) {
    elementSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.remove();
        });
    });
};