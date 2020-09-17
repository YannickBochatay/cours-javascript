let tempsEcoule=0;
let timer = window.setInterval(logEtIncremente,1000);

function logEtIncremente() {

	console.log(++tempsEcoule);

	if (tempsEcoule===10) window.clearInterval(timer);
}
