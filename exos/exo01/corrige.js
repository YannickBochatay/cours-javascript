var obj = {
	nom : null,
	age : null,
	sexe : null
};

var str="";

for (let n in obj) {
	obj[n] = prompt(n+" : ");
	str = str + n + " : " + obj[n] + "\n";
}

alert(str);
