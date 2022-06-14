function modifObjet(obj,props) {
  for (let n in props) {
    if (!(n in obj)) {
      obj[n] = props[n];
    }
  }
}
