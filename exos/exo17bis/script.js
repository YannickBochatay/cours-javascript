;(function() {
    
    "use strict";
    
    var tbody = document.querySelector("#tableauPrevisions tbody");
    var trModele = tbody.querySelector(".modele");
    
    function insertLigneTableau(prevision) {
        
        var tr = trModele.cloneNode(true);
        var tds = tr.children;
        
        tds[0].textContent = prevision.commune;
        tds[1].textContent = prevision.dvalid.toLocaleDateString();
        tds[2].textContent = Math.round(prevision.tn/10) + "°C";
        tds[3].textContent = Math.round(prevision.tx/10) + "°C";
        
        tbody.appendChild(tr);
    }
    
    function requeteAjax(url,onload) {
        
        var req = new XMLHttpRequest();
        
        req.open('GET',url);
        
        req.onload = function() {
            
            if (this.status != 200) throw new Error("Erreur "+this.status+" : "+this.responseText);
            
            onload(this.responseText);
        };
        
        req.send();
    }
    
    function traiteDate(champ) {
        
        var strDate = champ.replace(" ","T");
        
        return new Date(strDate);
    }
    
    function csv2tab(csv) {
        
        var tab = [];
        
        csv.trim().split("\n").forEach(function(ligne) {
            
            var obj = {};
            var champs = ligne.split(";");
            
            if (champs.length < 5) return;
            
            obj.id = champs[0];
            obj.commune = champs[1];
            obj.dvalid = traiteDate(champs[2]);
            obj.tn = champs[3];
            obj.tx = champs[4];
            
            tab.push(obj);
            
        });
        
        return tab;
    }
    
    function creeUrl(options) {
        
        var url = "http://nihoa-v27b.meteo.fr/cdp1/q_p?";
        url+= "id="+options.id.join();
        url+= "&dpivot="+options.dpivot.join();            
        url+= "&param=tn,tx&meta=id,commune,dvalid";
        
        return url;
    }
    
    function recupTnTx(options) {
        
        var url = creeUrl(options);
        
        requeteAjax(url,function(resul) {
            var previsions = csv2tab(resul);
            previsions.forEach(insertLigneTableau);
        });
    }
    
    tbody.removeChild(trModele);
    
    recupTnTx({
        id : [290190,315570],
        dpivot : [0,24]
    });
    
}());
