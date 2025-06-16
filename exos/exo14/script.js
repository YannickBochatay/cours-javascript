let lien = document.getElementById("hautDePage");

function checkScroll() {

    let methode = (window.scrollY > 500) ? "remove" : "add"
    lien.classList[methode]("hidden");
}

window.addEventListener("scroll",checkScroll);

checkScroll();
