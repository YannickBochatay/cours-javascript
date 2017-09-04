var existe = typeof str != undefined;

assert( existe && !/(^\s|\s$)/.test(str), "Suppression des blancs");
assert( existe && !/[a-z]/.test(str), "Majuscules");
assert( existe && str.length <=20, "Limitation à 20 caractères");