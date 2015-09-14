;(function() {
	
    "use strict";
  
    var tdX = document.getElementById("abcisse"),
        tdY = document.getElementById("ordonnee"),
        tdTag = document.getElementById("balise"),
        descriptElmt = document.getElementById("descriptElmt");
                
    document.addEventListener("mousemove",function(e) {
        
        tdX.textContent = e.clientX;
        tdY.textContent = e.clientY;
        tdTag.textContent = e.target.tagName;        
    });
    
    document.addEventListener("click",function(e) {
        
        var target = e.target,
            str = "";
        
        for (var n in target) str+= n+" : "+target[n]+"\n";
        
        descriptElmt.textContent = str; 
    });
    	
}());