;(function() {
	
    "use strict";
    
    var tbody = document.querySelector("#listeDesInstructions tbody");
    
    var trModele = tbody.querySelector(".modele");
    
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
            
    
    function recupInstructions() {
            
        var req = new XMLHttpRequest();

        req.open('GET','http://mpfc.meteo.fr/back/modeles/instruction/liste/?page=1&tri=id&sens=desc');

        req.onload = function() {

          if (this.status != 200) throw new Error("Erreur "+this.status+" : "+this.responseText);

          var instructions = JSON.parse(this.responseText);

          instructions.forEach(insertLigneTableau);

        };

        req.send();
    }
    
    recupInstructions();
    
}());