var regEmail = /^[\w.-]+@[\w-]+\.[a-z]{2,6}$/;

function verifEmail_v1(email) {

    return regEmail.test(email);
}

function verifEmail_v2(email) {

    return /^[\w.-]+@[\w-]+\.[a-z]{2,6}$/.test(email);
}

function verifEmail_v3(email) {

    return new RegExp("^[\w.-]+@[\w-]+\.[a-z]{2,6}$").test(email);
}

function testPerf(fctVerifEmail) {
    
    var start = new Date,
        email = "yannick.bochatay@meteo.fr",
        i = 0;
   
    for (;i<1e7;i++) fctVerifEmail(email);
    
    return new Date - start;
}

console.log( testPerf(verifEmail_v1), testPerf(verifEmail_v2), testPerf(verifEmail_v3) );