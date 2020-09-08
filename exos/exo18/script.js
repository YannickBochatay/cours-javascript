(function() {

    "use strict";

    let ul = document.querySelector("#listeDesInstructions");
    let ex = document.querySelector("#exemple");

    ex.remove();

    function ajoutInstruction(instruction) {

      let a = document.createElement("a");
      a.href = "http://mpfc.meteo.fr/#/instructions/"+instruction.id;
      a.textContent = instruction.action;

      let li = document.createElement("li");
      li.appendChild(a);

      ul.appendChild(li);
    }

    async function recupInstructions() {

      let res = await fetch('http://mpfc.meteo.fr/back/modeles/instruction/liste/?page=1&tri=id&sens=desc');
      let instructions = await res.json();

      instructions.forEach(ajoutInstruction);
    }

    recupInstructions();

}());
