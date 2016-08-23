function lanceChrono() {
	
    var tempsEcoule=0, timer;

    function logEtIncremente() {
        
        console.log(tempsEcoule);
        
        if (tempsEcoule==10) return window.clearInterval(timer);
        
        tempsEcoule++;
    }

    timer = window.setInterval(logEtIncremente,1000);

    logEtIncremente();
}

lanceChrono();