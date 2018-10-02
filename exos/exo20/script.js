(function() {

  "use strict";

  let tbody = document.querySelector("#listeDesInstructions tbody");

  let trModele = tbody.querySelector(".modele");

  let req;

  function insertLigneTableau(instruction) {

    let tr = trModele.cloneNode(true);

    let lien = tr.querySelector("a");

    tr.firstElementChild.textContent = instruction.id;

    lien.href = "http://mpfc.meteo.fr/#/instructions/"+instruction.id;
    lien.textContent = instruction.action;

    tbody.appendChild(tr);
  }

  //on supprime la ligne du tableau qui sert de modele
  trModele.parentNode.removeChild(trModele);


  fetch('http://mpfc.meteo.fr/back/modeles/instruction/liste/?page=1&tri=id&sens=desc')
  .then(response => response.json())
  .then(instructions => instructions.forEach(insertLigneTableau));

}());
