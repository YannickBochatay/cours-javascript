//*
//Sans jQuery
(function() {
	
    "use strict";
    
    var tdHeure = document.getElementById("heure"),
        tdHauteur = document.getElementById("hauteur"),
        tdLargeur = document.getElementById("largeur");
    
    function afficheTaille() {
        tdHeure.textContent = new Date().toLocaleTimeString();
        tdLargeur.textContent = window.innerWidth;
        tdHauteur.textContent = window.innerHeight;
    }

    window.addEventListener("resize",afficheTaille);
    
    afficheTaille();
	
}());
//*/

//*
//Avec jQuery
$(function() {
	
    "use strict";
    
    var tdHeure = $("#heure"),
        tdHauteur = $("#hauteur"),
        tdLargeur = $("#largeur");
    
    function afficheTaille() {
        tdHeure.text( new Date().toLocaleTimeString() );
        tdLargeur.text( window.innerWidth );
        tdHauteur.text( window.innerHeight );
    }

    $(window).on("resize",afficheTaille);
    
    afficheTaille();
	
});
//*/
