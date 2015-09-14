;(function() {
	
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