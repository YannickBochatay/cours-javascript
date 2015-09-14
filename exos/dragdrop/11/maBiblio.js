define(["events"],function(Events) {
	     	
	"use strict";
	
	var maBiblio = {};
	
	///////////////////////////////////////////////////////////////////////////////////////
	function StdConstruct() {}
	
	StdConstruct.prototype = new Events();
	
	StdConstruct.prototype.constructor = StdConstruct;
		
	StdConstruct.prototype.set = function(opt) {
    		
		for (var n in opt) {
		
			if (n in this) this[n] = opt[n];
		}
    };
    	
    StdConstruct.prototype.reset = function() {
    		
    	var proto = Object.getPrototypeOf(this);
    		
    	for (var n in proto) this[n] = proto[n];
    };
	
	
	maBiblio.StdConstruct = StdConstruct;
	
	///////////////////////////////////////////////////////////////////////////////////////
	function DragNdrop(elmt,opt) {
    	
    	this.elmt = elmt;
    	
    	this.onstart = null;
        this.ondrag = null;
        this.onend = null;
        this._attachedFunction = null;
    	
    	if (opt) this.enable(opt);
    }
    
    DragNdrop.prototype = new StdConstruct();
    
    DragNdrop.prototype.enable = function(opt) {
    	
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
            
            that.trigger("start",that.elmt,e);
        }
        
        function onmousemove(e) {
        	
        	that.elmt.style.left = posXinit + (e.clientX - mouseXinit) + "px";
        	that.elmt.style.top = posYinit + (e.clientY - mouseYinit) + "px";
            
            that.trigger("drag",that.elmt,e);
        }
        
        function onmouseup(e) {
        	
        	document.removeEventListener("mousemove",onmousemove);
        	document.removeEventListener("mouseup",onmouseup);
        	
        	that.trigger("end",that.elmt,e);
        }
        
        this.elmt.addEventListener("mousedown",onmousedown);
        
        this._attachedFunction = onmousedown;
	};
    	
	DragNdrop.prototype.disable = function() {
    		
		if (!this._attachedFunction) return;
		
		this.elmt.removeEventListener("mousedown",this._attachedFunction);
		this._attachedFunction = null;
	};
	
	DragNdrop.prototype.destroy = function() {
		
		this.disable();
		this.reset();
	};
	
	maBiblio.DragNdrop = DragNdrop;
	
	
	
	maBiblio.rand = function(min,max) {
		
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	
	maBiblio.colorRand = function() {
				
		var rgb = ["r","g","b"].map(function() { return maBiblio.rand(0,255); });
		
		return "rgb("+rgb+")";
	};
	
    
    return maBiblio;
   
});