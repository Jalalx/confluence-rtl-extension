function hasRtlContent(element) {
    const MAX_LENGTH = 50;

    // look for <p> tags
    const paragraphElements = document.querySelectorAll('div#main-content p');
    for(var i = 0; i < paragraphElements.length; i++){
        const paragraph = paragraphElements[i];
        const paragraphContent = paragraph.innerText.trim();
        if (paragraphContent.length) {
            if (paragraphContent.length > 100) paragraphContent = paragraphContent.substring(0, MAX_LENGTH).replace(/<[^>]*>/g, "");
            return isRTL(content);
        }
    }

    let content = element.innerHTML.trim();
    if (content.length > 100) content = content.substring(0, MAX_LENGTH).replace(/<[^>]*>/g, "");
    return isRTL(content);
}

/* From https://stackoverflow.com/a/14824756/375958 */
function isRTL(s) {
    const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
        rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

    return rtlDirCheck.test(s);
};

function isConfluencePage() {
    const confluenceMetaUrl = document.querySelector('meta#confluence-base-url');
    return !!confluenceMetaUrl;
}

function init() {
    if (!isConfluencePage()) {
        // Page is not a confluence page.
        return;
    }
    console.log('Confluence RTL extension loaded.');

    const contentDiv = document.querySelector('div#content');
    if (contentDiv && hasRtlContent(contentDiv)) {
        contentDiv.setAttribute('dir', 'rtl');
    } else if (!contentDiv) {
        console.log('Content element was not found.')
    }
}

init();