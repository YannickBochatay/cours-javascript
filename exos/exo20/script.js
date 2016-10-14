(function() {
	
    "use strict";
    
    var tbody = document.querySelector("#listeDesInstructions tbody");
    
    var trModele = tbody.querySelector(".modele");
    
    var req;
    
    function insertLigneTableau(instruction) {
        
        var tr = trModele.cloneNode(true);
        
        var lien = tr.querySelector("a");
        
        tr.firstElementChild.textContent = instruction.id;
        
        lien.href = "http://mpfc.meteo.fr/#/instructions/"+instruction.id;
        lien.textContent = instruction.action;
        
        tbody.appendChild(tr);
    }
            
    //on supprime la ligne du tableau qui sert de modele
    trModele.parentNode.removeChild(trModele);
            
            
    fetch('http://mpfc.meteo.fr/back/modeles/instruction/liste/?page=1&tri=id&sens=desc')
    .then(function(response) {
        return response.json();
    })
    .then(function(instructions) {
        instructions.forEach(insertLigneTableau);  
    });
    
}());
