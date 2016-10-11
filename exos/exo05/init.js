function modifObjet( objAModifier, propsAModifier ) {

	/* votre code */
}

//exemple
var obj = { nom : "Toto" };

modifObjet( obj, { age : 26, nom : "Tata" } );

obj.age; //26
obj.nom; //Toto (la propriété existait déjà, elle n'est pas modifiée)
