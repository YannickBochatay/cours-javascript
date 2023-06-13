var _objet = { nom : "Yannick" };

var result1 = recupProps(_objet,{ age : 37 });
assert( result1.age == 37, "Ajout d'une propriété" );

var result2 = recupProps(_objet,{ nom : "Bernard" });
assert( result2.nom == "Yannick", "une propriété existante n'est pas modifiée" );

var result3 = recupProps(_objet,{ sexe : "M", metier : "meteo" });
assert( result3.sexe == "M" && result3.metier == "meteo" && result3.nom == "Yannick" && result3.age == 37, "ajout simultané des plusieurs propriétés" );
