/**
 * Améliorations :
 * - customisation : on peut lier le dragNdrop à d'autres actions.
 * 
 * Problèmes :
 * - on ne programme pas vraiment objet, on a une seule fonction avec beaucoup d'arguments.
 * 
 * Cette version n'est pas satisfaisante.
 */
(function() {
        	
	"use strict";
  
    function dragNdrop(elmt,onstart,ondrag,onend) {
        
        var mouseXinit, mouseYinit, posXinit, posYinit;
        
        function onmousedown(e) {
        	
        	e.preventDefault();
        	
        	mouseXinit = e.clientX;
            mouseYinit = e.clientY;
            posXinit = parseInt(elmt.style.left,10);
            posYinit = parseInt(elmt.style.top,10);
            
            document.addEventListener("mousemove",onmousemove);
            document.addEventListener("mouseup",onmouseup);
            
            if (onstart) onstart.call(elmt,e);
        }
        
        function onmousemove(e) {
        	
            elmt.style.left = posXinit + (e.clientX - mouseXinit) + "px";
            elmt.style.top = posYinit + (e.clientY - mouseYinit) + "px";
            
            if (ondrag) ondrag.call(elmt,e);
        }
        
        function onmouseup(e) {
        	
        	document.removeEventListener("mousemove",onmousemove);
        	document.removeEventListener("mouseup",onmouseup);
        	
        	if (onend) onend.call(elmt,e);
        }
        
        elmt.addEventListener("mousedown",onmousedown);
    }
    
    
    function logPosition() {
    
    	console.log(this.style.left,this.style.top);
    }
    
    function checkPosition() {
    	
    	var x = parseInt(this.style.left,10),
    		y = parseInt(this.style.top,10);
    	
    	if (x < 0 || y < 0) alert("Vous êtes presque sorti de la page");
    }
    
    var div = document.getElementById("maDiv");
    
    dragNdrop(div , logPosition, logPosition, checkPosition );
    
}());