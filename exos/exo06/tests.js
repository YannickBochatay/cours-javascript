var _tab = [12,13,15,12,13,15];

modifTableau(_tab);

assert(_tab[1] == 1.3 , "Modification d'un tableau" );

_tab = [12,13,15,12,13,15];

_tab = nouveauTableau(_tab);

assert(_tab[1] == 1.3 , "Nouveau tableau" );