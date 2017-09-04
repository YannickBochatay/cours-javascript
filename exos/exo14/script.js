//*
//Sans jQuery
(function() {
	
    "use strict";
    
    var lien = document.getElementById("hautDePage");
    
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
    
    var lien = $("#hautDePage");
    
    function checkScroll() {
       
        var methode = (window.scrollY > 500 ? "removeClass" : "addClass");
        
        lien[methode]("hidden");
    }

    $(window).on("scroll",checkScroll);
    
    checkScroll();
	
});
//*/
