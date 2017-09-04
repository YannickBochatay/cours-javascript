/**
 * Utilisation de la bibliothèque requirejs pour programmation modulaire sans utiliser de variables globales
 * 
 * Cette version est bonne.
 */
require(["maBiblio"],function(maBiblio) {
        	
	"use strict";
     
    function logPosition() {
    
    	console.log(this.style.left,this.style.top);
    }
    
    function checkPosition() {
    	
    	var x = parseInt(this.style.left,10),
    		y = parseInt(this.style.top,10);
    	
    	if (x < 0 || y < 0) alert("Vous êtes presque sorti de la page");
    }
    
    var div = document.getElementById("maDiv");
    
    var dragNdrop = new maBiblio.DragNdrop(div,{
    	onstart : logPosition,
    	ondrag : logPosition,
    	onend : checkPosition
    });
    
    window.setTimeout(function() { dragNdrop.disable(); },5000);
    
});