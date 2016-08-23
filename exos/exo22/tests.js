assert(calculatrice.ajouter(3,5) == 8 , "Addition" );
assert(calculatrice.soustraire(3,5) == -2 , "Soustraction" );
assert(calculatrice.recupMemoire() == -2 , "Récupération du dernier résultat" );
assert(calculatrice.recupMemoire() == 8 , "Récupération du résultat antérieur" );
assert(calculatrice.recupMemoire() === undefined , "Mémoire vide" );