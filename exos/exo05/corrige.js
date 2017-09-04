function modifObjet(obj,props) {

  	var n;
   
  	for (n in props) {
  		if (n in obj) continue;
  		obj[n] = props[n];
  	}
}
