/*
//Sans jQuery
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
//*/

//*
//Avec jQuery
$(function() {
    "use strict";
  
    var tdX = $("#abcisse"),
        tdY = $("#ordonnee"),
        tdTag = $("#balise"),
        descriptElmt = $("#descriptElmt");
                
    $(document).on({
     
        mousemove : function(e) {
        
            tdX.text(e.clientX);
            tdY.text(e.clientY);
            tdTag.text(e.target.tagName);
        },
        
        click : function(e) {
        
            var target = e.target,
                str = "";

            for (var n in target) str+= n+" : "+target[n]+"\n";

            descriptElmt.text(str);
        }
    });
    
});
//*/