assert( typeof obj.nom === "string", "nom de type chaîne de caractère");
assert( typeof obj.prenom === "string", "prenom de type chaîne de caractère");
assert( typeof obj.parents === "object", "parents de type objet");
assert( typeof obj.parents?.pere === "object", "pere de type objet");
assert( typeof obj.parents?.mere === "object", "mere de type objet");
assert( typeof obj.parents?.pere?.nom === "string", "nom du père de type chaîne de caractère");
assert( typeof obj.parents?.pere?.prenom === "string", "prenom du père de type chaîne de caractère");
assert( typeof obj.parents?.mere?.nom === "string", "nom de la mère de type chaîne de caractère");
assert( typeof obj.parents?.mere?.prenom === "string", "prenom de la mère de type chaîne de caractère");

