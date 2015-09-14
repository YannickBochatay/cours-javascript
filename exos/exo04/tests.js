var _objet = { nom : "Yannick" };

modifObjet(_objet,{ age : 37 });
assert( _objet.age == 37, "Ajout d'une propriété" );

modifObjet(_objet,{ nom : "Bernard" });
assert( _objet.nom == "Yannick", "une propriété existante n'est pas modifiée" );

modifObjet(_objet,{ sexe : "M", metier : "meteo" });
assert( _objet.sexe == "M" && _objet.metier == "meteo" && _objet.nom == "Yannick" && _objet.age == 37, "ajout simultané des plusieurs propriétés" );