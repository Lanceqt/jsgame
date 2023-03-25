import { isValidHtmlTag } from "./jsonParser.js";

/**
 * Creates an HTML element with the provided properties.
 *
 * @async
 * @function createElement
 * @param {Object} elementProperties - The properties for the new element.
 * @param {string} elementProperties.elementType - The type of element to create.
 * @param {string} [elementProperties.content] - The inner text content of the element.
 * @param {string} [elementProperties.elementId] - The custom data-id attribute of the element.
 * @param {string} [elementProperties.CSSClass] - The CSS class of the element.
 * @param {string} [elementProperties.CSSInlineProp] - The CSS property to be applied inline.
 * @param {string} [elementProperties.CSSInlineValue] - The value of the CSS property to be applied inline.
 * @returns {Promise<HTMLElement>} - A promise that resolves to the created HTMLElement.
 * @throws {Error} - If elementType is not a valid HTML tag.
 */
export async function createElement(elementProperties) {
    const { elementType, content, elementId, CSSClass, CSSInlineProp, CSSInlineValue } =
        elementProperties;
    if (!(await isValidHtmlTag(elementType))) {
        throw new Error(
            `elementType is required to create an element it is currently set to "${elementType}"it has to be a valid html tag`
        );
    }
    const newElement = document.createElement(elementType);

    // ...(if condition is true then {propertyName: value} else {})
    // ...(condition ? {propertyName: value} else {empty object})
    // ...(if both conditions are true, then {propertyName: {key: value}} else {})
    // ...(condition1 && condition2 ? {propertyName: {[key]: value}} : {empty})
    Object.assign(newElement, {
        ...(content ? { innerText: content } : {}),
        ...(CSSClass ? { className: CSSClass } : {}),
        ...(CSSInlineProp && CSSInlineValue ? { style: { [CSSInlineProp]: CSSInlineValue } } : {}),
    });
    if (elementId) {
        newElement.dataset.id = elementId;
    }

    // console.log(newElement.outerHTML);
    return newElement;
}

/**
 * Adds an array of child elements to a parent element in the DOM.
 *
 * @function addToDOM
 * @param {HTMLElement} parentElement - The parent element to which the child elements will be added.
 * @param {HTMLElement[]} childElements - An array of child elements to be added to the parent element.
 */
export function addToDOM(parentElement, childElement) {
    const fragment = new DocumentFragment();

    childElement.forEach((childElement) => {
        fragment.appendChild(childElement);
    });

    parentElement.appendChild(fragment);
}

/**
 * Removes elements from the DOM based on the provided selectors.
 *
 * @function removeElement
 * @param {...string} elementSelectors - One or more CSS selectors used to target the elements to be removed.
 */
export function removeElement(...elementSelectors) {
    elementSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
            element.remove();
        });
    });
}
