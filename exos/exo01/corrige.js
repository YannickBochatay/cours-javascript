let obj = {
	nom : null,
	age : null,
	sexe : null
};

let str="";

for (let key in obj) {
	obj[key] = prompt(key + " : ");
	str += `${key} : ${obj[key]} \n`;
}

alert(str);
