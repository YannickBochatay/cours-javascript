let lien = document.getElementById("hautDePage");

function checkScroll() {

    lien.classList[ (window.scrollY > 500) ? "remove" : "add" ]("hidden");
}

window.addEventListener("scroll",checkScroll);

checkScroll();
