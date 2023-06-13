function recupProps(props, propsDefaut) {

	/* votre code */
}

//exemple
let propsDefaut = { age : 26, nom : "Toto", sexe : "M" }
let obj = { nom : "Tata" }
let props = recupProps(obj, propsDefaut);

props.age; //26
props.nom; //Tata (la propriété existait déjà, elle n'est pas modifiée)

props; // { nom : "Tata" } Les objets initiaux ne sont pas modifiés
propsDefaut; // { age : 26, nom : "Toto", sexe : "M" }
