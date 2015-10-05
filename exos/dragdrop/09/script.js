/**
 * Utilisation d'une petite bibliothèque tierce (events.js) pour une gestion plus fine des évènements.
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
    
    dragNdrop.on("end",function() {
    	this.style.backgroundColor = maBiblio.colorRand();
    });
    
    window.setTimeout(function() { dragNdrop.disable(); },5000);
    
});