var _objet = { nom : "Yannick" };

var result1 = initProps(_objet,{ age : 37 });
assert(result1.nom == "Yannick" && result1.age == 37, "Ajout d'une propriété" );

var result2 = initProps(_objet,{ nom : "Bernard" });
assert(result2.nom == "Yannick", "une propriété existante n'est pas modifiée" );

var result3 = initProps(_objet,{ sexe : "M", metier : "meteo" });
assert(result3.sexe == "M" && result3.metier == "meteo" && result3.nom == "Yannick", "ajout simultané des plusieurs propriétés" );
