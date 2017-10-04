/**
 * Améliorations :
 * - création d'un constructeur
 * - définition des méthodes dans le prototype
 * - les évènements deviennent des propriétés de l'objet.
 * - on peut stopper le dragNdrop quand on veut.
 * 
 * Problème :
 * - le constrcuteur et l'utilisation du constructeur sont dans le meme fichier
 * 
 * Cette version n'est pas satisfaisante.
 */
(function() {
    
    "use strict";
    
    class DragNdrop {
        
        constructor(elmt) {   
            this.elmt = elmt;
            this.onstart = null;
            this.ondrag = null;
            this.onend = null;
            this._attachedFunction = null;
        }

        enable() {

            this.disable();
            
            var that = this,
            elmt = this.elmt,
            mouseXinit, mouseYinit, posXinit, posYinit;
            
            function onmousedown(e) {
                
                e.preventDefault();
                
                mouseXinit = e.clientX;
                mouseYinit = e.clientY;
                posXinit = parseInt(elmt.style.left,10);
                posYinit = parseInt(elmt.style.top,10);
                
                document.addEventListener("mousemove",onmousemove);
                document.addEventListener("mouseup",onmouseup);
                
                if (that.onstart) that.onstart.call(elmt,e);
            }
            
            function onmousemove(e) {
                
                elmt.style.left = posXinit + (e.clientX - mouseXinit) + "px";
                elmt.style.top = posYinit + (e.clientY - mouseYinit) + "px";
                
                if (that.ondrag) that.ondrag.call(elmt,e);
            }
            
            function onmouseup(e) {
                
                document.removeEventListener("mousemove",onmousemove);
                document.removeEventListener("mouseup",onmouseup);
                
                if (that.onend) that.onend.call(elmt,e);
            }
            
            this._attachedFunction = onmousedown;
            
            elmt.addEventListener("mousedown",onmousedown);
        }

        disable() {
            
            if (!this._attachedFunction) return;
            
            this.elmt.removeEventListener("mousedown",this._attachedFunction);
            this._attachedFunction = null;
        }

    }
    
    
    
    function logPosition() {
        
    	console.log(this.style.left,this.style.top);
    }
    
    function checkPosition() {
    	
    	var x = parseInt(this.style.left,10),
        y = parseInt(this.style.top,10);
    	
    	if (x < 0 || y < 0) alert("Vous êtes presque sorti de la page");
    }
    
    var dragNdrop = new DragNdrop(document.getElementById("maDiv"));
    dragNdrop.onstart = logPosition;
    dragNdrop.ondrag = logPosition;
    dragNdrop.checkPosition;
    dragNdrop.enable();
    
    window.setTimeout(function() { dragNdrop.disable(); },5000);
    
}());