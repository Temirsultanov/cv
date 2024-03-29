const BREAKPOINT = 850;

let SECTION_PADDING = 70;
let HEADER_HEIGHT = 100;
let ADDITIONAL_OFFSET = 20;

if (window.innerWidth < BREAKPOINT) {
    HEADER_HEIGHT = 60;
}

const OFFSET = HEADER_HEIGHT - SECTION_PADDING + ADDITIONAL_OFFSET;;

const header = document.querySelector(".header");
const headerAnchorLinks = header.querySelectorAll(".anchorLink");

const anchors = [];

headerAnchorLinks.forEach(link => {
    const id = link.href.split("#").reverse()[0];
    const section = document.querySelector("#" + id);

    if (!section) return;

    const position = getLengthFromElemToDocumentTop(section) - OFFSET;
    anchors.push({ link, id, position });
});

anchors.forEach(anchor => {
    anchor.link.addEventListener("click", function(evt) {
        evt.preventDefault();
        
        const newURL = new URL(`#${anchor.id}`, window.location.href);

        window.scrollTo({ top: anchor.position, behavior: "smooth" });
        window.history.replaceState("", "", newURL);
    })
});

function getLengthFromElemToDocumentTop(elem) {
    return Math.round(elem.getBoundingClientRect().top + window.pageYOffset);
};