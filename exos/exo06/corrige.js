function modifTableau(tab) {

    for (var i=0,N=tab.length;i<N;i++) tab[i]/=10;
}

function nouveauTableau(tab) {
    
    return tab.map(function(elmt) { return elmt/10; });
}
