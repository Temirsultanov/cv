const header = document.querySelector(".header");

window.addEventListener("scroll", onWindowScrolled);

function onWindowScrolled() {
    const scrolledLength = window.pageYOffset;
    if (scrolledLength < 50) showHeader();
    else hideHeader();
}

function hideHeader() {
    if (header.classList.contains("header-scrolled")) return;
    header.classList.add("header-scrolled");
}

function showHeader() {
    if (header.classList.contains("header-scrolled")) {
        header.classList.remove("header-scrolled")
    }; 
}