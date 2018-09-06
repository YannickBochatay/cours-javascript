let obj = {
	nom : null,
	age : null,
	sexe : null
};

let str="";

for (let n in obj) {
	obj[n] = prompt(n + " : ");
	str += `${n} : ${obj[n]} \n`;
}

alert(str);
