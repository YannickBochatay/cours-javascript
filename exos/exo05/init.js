function initProps(props, propsDefaut) {

	/* votre code */
}

//exemple
let propsDefaut = { color : "black", fontSize : 12 }
let obj = { color : "pink" }
let props = initProps(obj, propsDefaut);

props.fontSize; // 12
props.color; // pink (la propriété existait déjà, elle n'est pas modifiée)

obj; // { color : "pink" } Les objets initiaux ne sont pas modifiés
propsDefaut; // { color : "black", fontSize : 12 }
