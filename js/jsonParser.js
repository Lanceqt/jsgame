async function loadHtmlTags() {
    try {
        const response = await fetch("../json/htmlTavvgs.json");
        const data = await response.json();
        return new Set(data.htmlTags);
    } catch (error) {
        console.log(`There was an error with the JSON loading: ${error}`);
    }
}

export async function isValidHtmlTag(tag) {
    const validTags = await loadHtmlTags();
    console.log(validTags);
    return validTags.has(tag.toLowerCase());
}