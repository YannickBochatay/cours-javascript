/**
 * Améliorations :
 * - utilisation du prototype pour avoir une seule référence vers les fonctions
 * - ajout des méthodes set et reset pour définir et réinitialiser rapidement les propriétés
 * 
 * Problèmes :
 * - le module et l'utilisation du module sont dans le même fichier
 * 
 * Cette version n'est pas satisfaisante.
 */
(function() {
        	
	"use strict";
  
    function DragNdrop(elmt,opt) {
    	
    	this.elmt = elmt;
    	
    	if (opt) this.enable(opt);
    }
    
    DragNdrop.prototype = {
    		
    	constructor : DragNdrop, 
    	
    	onstart : null,
    	
    	ondrag : null,
    	
    	onend : null,
    	
    	_attachedFunction : null,
    	
    	set : function(opt) {
    		
    		for (var n in opt) {
    		
    			if (n in this) this[n] = opt[n];
    		}
    	},
    	
    	reset : function() {
    		
    		var proto = Object.getPrototypeOf(this);
    		
    		for (var n in proto) this[n] = proto[n];
    	},
    		
    	enable : function(opt) {
    		
    		this.disable();
    		if (opt) this.set(opt);
    		
    		var that = this,
    			mouseXinit, mouseYinit, posXinit, posYinit;
    	        
	        function onmousedown(e) {
	        	
	        	e.preventDefault();
	        	
	        	mouseXinit = e.clientX;
	            mouseYinit = e.clientY;
	            posXinit = parseInt(that.elmt.style.left,10);
	            posYinit = parseInt(that.elmt.style.top,10);
	            
	            document.addEventListener("mousemove",onmousemove);
	            document.addEventListener("mouseup",onmouseup);
	            
	            if (that.onstart) that.onstart.call(that.elmt,e);
	        }
	        
	        function onmousemove(e) {
	        	
	        	that.elmt.style.left = posXinit + (e.clientX - mouseXinit) + "px";
	        	that.elmt.style.top = posYinit + (e.clientY - mouseYinit) + "px";
	            
	            if (that.ondrag) that.ondrag.call(that.elmt,e);
	        }
	        
	        function onmouseup(e) {
	        	
	        	document.removeEventListener("mousemove",onmousemove);
	        	document.removeEventListener("mouseup",onmouseup);
	        	
	        	if (that.onend) that.onend.call(that.elmt,e);
	        }
	        
	        this.elmt.addEventListener("mousedown",onmousedown);
	        
	        this._attachedFunction = onmousedown;
    	},
    	
    	disable : function() {
    		
    		if (!this._attachedFunction) return;
    		
    		this.elmt.removeEventListener("mousedown",this._attachedFunction);
    		this._attachedFunction = null;
    	}
    };
    
    
    
    
   
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
    
    var dragNdrop = new DragNdrop(div,opt);
    
    window.setTimeout(function() { dragNdrop.disable(); },5000);
    
}());