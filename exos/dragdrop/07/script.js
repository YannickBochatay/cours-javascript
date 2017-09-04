/**
 * Améliorations :
 * - le module devient un plugin jQuery si jQuery est présent.
 * 
 * Cette version est bonne.
 */
(function($) {
        	
	"use strict";
     
    function logPosition() {
    
    	console.log(this.style.left,this.style.top);
    }
    
    function checkPosition() {
    	
    	var x = parseInt(this.style.left,10),
    		y = parseInt(this.style.top,10);
    	
    	if (x < 0 || y < 0) alert("Vous êtes presque sorti de la page");
    }
    
    var div = $("#maDiv");
    
    div.dragNdrop({
    	onstart : logPosition,
    	ondrag : logPosition,
    	onend : checkPosition
    });
    
    window.setTimeout(function() { div.dragNdrop("disable"); },5000);
    
}(jQuery));