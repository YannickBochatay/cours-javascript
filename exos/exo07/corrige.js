function modifTableau(tab) {

    tab.forEach(function(elmt,i) { tab[i]/=10; });
}

function nouveauTableau(tab) {
    
    return tab.map(function(elmt) { return elmt/10; });
}
