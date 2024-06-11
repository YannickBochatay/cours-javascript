let obj = {
  nom : null,
  prenom : null,
  age : null
};

for (let key in obj) {
	obj[key] = prompt(key + " : ");
}

alert(JSON.stringify(obj));
