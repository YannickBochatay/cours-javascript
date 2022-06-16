(function() {

  "use strict";

  let tbody = document.querySelector("#tableauPrevisions tbody");
  let trModele = tbody.querySelector(".modele");

  function insertLigneTableau(prevision) {

    let tr = trModele.cloneNode(true);
    let tds = tr.children;

    tds[0].textContent = prevision.commune;
    tds[1].textContent = prevision.dvalid.toLocaleDateString();
    tds[2].textContent = Math.round(prevision.tn/10) + "°C";
    tds[3].textContent = Math.round(prevision.tx/10) + "°C";

    tbody.appendChild(tr);
  }

  function csv2tab(csv) {

    let tab = [];

    csv.trim().split("\n").forEach(ligne => {

      let obj = {};
      let champs = ligne.split(";");

      if (champs.length < 5) return;

      obj.id = champs[0];
      obj.commune = champs[1];
      obj.dvalid = new Date(champs[2]);
      obj.tn = Number(champs[3]);
      obj.tx = Number(champs[4]);

      tab.push(obj);

    });

    return tab;
  }

  function creeUrl({ ids, echs }) {

    let url = "http://nihoa-v27b.meteo.fr/cdp1/q_p?";
    url+= "id="+ids.join();
    url+= "&dpivot="+echs.join();
    url+= "&param=tn,tx&meta=id,commune,dvalid";

    return url;
  }

  async function recupTnTx(options) {

      let url = creeUrl(options);
      let res = await fetch(url);
      let resText = await res.text();
      let previsions = csv2tab(resText);
      previsions.forEach(insertLigneTableau);
  }

  trModele.remove();

  recupTnTx({
    ids : ["290190","315570"],
    echs : [0,24]
  });

}());
