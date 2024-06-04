class Calculatrice {

  #memoire

  constructor() {
    this.#memoire = [];
  }

  #stockeEnMemoire(val) {
    this.#memoire.push(val);
  }

  ajouter(a,b) {
    let val = a+b;
    this.#stockeEnMemoire(val);
    return val;
  }

  soustraire(a,b) {
    let val = a-b;
    this.#stockeEnMemoire(val);
    return val;
  }

  recupMemoire() {
    return this.#memoire.pop();
  }
}
