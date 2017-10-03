class Calculatrice {

  constructor() {
    this._memoire = []
  }

  _stockeEnMemoire(val) {
    this._memoire.push(val);
  }

  ajouter(a,b) {
    const val = a+b;
    this._stockeEnMemoire(val);
    return val;
  }

  soustraire(a,b) {
    const val = a-b;
    this._stockeEnMemoire(val);
    return val;
  }

  recupMemoire() {
    return this._memoire.pop();
  }
}
