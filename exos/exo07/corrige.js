function modifTableau(tab) {

    tab.forEach((elmt,i) => tab[i]/=10);
}

function nouveauTableau(tab) {

    return tab.map(elmt => elmt/10);
}
