/**
 * Améliorations :
 * - on utilise un espace de noms personnel pour déclarer le module.
 * 
 * Problèmes :
 * - certaines méthodes pourraient servir à l'écriture d'autres modules.
 * 
 * Cette version est acceptable.
 */
(function() {
        	
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
    
    var opt = {
    	onstart : logPosition,
    	ondrag : logPosition,
    	onend : checkPosition
    };
    
    var dragNdrop = new maBiblio.DragNdrop(div,opt);
        
    window.setTimeout(function() { dragNdrop.disable(); },5000);
    
}());