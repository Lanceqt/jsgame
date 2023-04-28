/**
 * @typedef {Object} HtmlTags
 * @property {string[]} htmlTags - An array of valid HTML tags
 */

/**
 * Loads the valid HTML tags from a JSON file and returns a set of the tags.
 *
 * @function loadHtmlTags
 * @async
 * @returns {Promise<Set<string>>} - A promise that resolves to a set of valid HTML tags
 * @throws {Error} - If there is an error loading the JSON file
 */

async function loadHtmlTags() {
    try {
        const response = await fetch("../json/htmlTags.json");
        const data = await response.json();
        return new Set(data.htmlTags);
    } catch (error) {
        console.log(`There was an error with the JSON loading: ${error}`);
        return new Set();
    }
}

/**
 * Checks if the provided tag is a valid HTML tag.
 *
 * @function isValidHtmlTag
 * @async
 * @param {string} tag - The tag to be checked
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the tag is valid
 */
export async function isValidHtmlTag(tag) {
    if (!validTags) {
        validTags = await loadHtmlTags();
    }
    return validTags.has(tag.toLowerCase());
}
