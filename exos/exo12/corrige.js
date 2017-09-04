function lanceChronoAleatoire() {
	
    var tempsEcoule=0;

    function logEtIncremente() {
        
        console.log(tempsEcoule);
        
        var delai = Math.min( 10000-tempsEcoule , Math.round(Math.random() * 2000) );
        
        if (delai <= 0) return;

        tempsEcoule+= delai;
        
        window.setTimeout(logEtIncremente,delai);
    }

    logEtIncremente();
}

lanceChronoAleatoire();