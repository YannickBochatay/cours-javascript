let obj = {
	nom : null,
	age : null,
	sexe : null
};

for (let key in obj) {
	obj[key] = prompt(key + " : ");
}

alert(JSON.stringify(str));
