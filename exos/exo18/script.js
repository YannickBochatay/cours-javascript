(function() {

    "use strict";

    let ul = document.querySelector("#listeDesInstructions");
    let ex = document.querySelector("#exemple");

    ul.removeChild(ex);

    function ajoutInstruction(instruction) {

      let li, a;

        a = document.createElement("a");
        a.href = "http://mpfc.meteo.fr/#/instructions/"+instruction.id;
        a.textContent = instruction.action;

        li = document.createElement("li");
        li.appendChild(a);

        ul.appendChild(li);
    }

    function recupInstructions() {

      let req = new XMLHttpRequest();

      req.open('GET','http://mpfc.meteo.fr/back/modeles/instruction/liste/?page=1&tri=id&sens=desc');

      req.onload = function() {

        if (this.status != 200) throw new Error(`Erreur ${this.status} : ${this.responseText}`);

        let instructions = JSON.parse(this.responseText);

        instructions.forEach(ajoutInstruction);

      };

      req.send();
    }

    recupInstructions();

}());
