//*
//Sans jQuery
(function() {

    "use strict";

    let lien = document.getElementById("hautDePage");

    function checkScroll() {

        lien.classList[ (window.scrollY > 500) ? "remove" : "add" ]("hidden");
    }

    window.addEventListener("scroll",checkScroll);

    checkScroll();

}());
//*/

/*
//Avec jQuery
$(function() {

    "use strict";

    let lien = $("#hautDePage");

    function checkScroll() {

        let methode = (window.scrollY > 500 ? "removeClass" : "addClass");

        lien[methode]("hidden");
    }

    $(window).on("scroll",checkScroll);

    checkScroll();

});
//*/
