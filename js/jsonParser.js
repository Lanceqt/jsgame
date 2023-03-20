async function loadHtmlTags() {
    try {
        const response = await fetch("../json/htmlTags.json");
        const data = await response.json();
        return new Set(data.htmlTags);
    } catch (error) {
        console.log(`There was an error with the JSON loading: ${error}`);
    }
}

export async function isValidHtmlTag(tag) {
    const validTags = await loadHtmlTags();
    return validTags.has(tag.toLowerCase());
}
