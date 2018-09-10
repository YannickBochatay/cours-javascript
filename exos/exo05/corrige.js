function modifObjet(obj,props) {
  for (let n in props) {
    if (n in obj) continue;
    obj[n] = props[n];
  }
}
