function modifObjet(obj,props) {

  	for (var n in props) {
  		if (n in obj) continue;
  		obj[n] = props[n];
  	}
}