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
    
    /* votre code */
}