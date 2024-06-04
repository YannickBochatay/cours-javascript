const regEmail = /^[\w.-]+@[\w-]+\.[a-z]{2,6}$/;

function verifEmail_v1(email) {

    return regEmail.test(email);
}

function verifEmail_v2(email) {

    return /^[\w.-]+@[\w-]+\.[a-z]{2,6}$/.test(email);
}

function verifEmail_v3(email) {

    return new RegExp("^[\w.-]+@[\w-]+\.[a-z]{2,6}$").test(email);
}

function testPerf(fct) {

    let start = Date.now();

    for (let i=0;i<10_000_000;i++) fct();

    return Date.now() - start;
}

const email = "yannick.bochatay@meteo.fr";

let test1 = testPerf(() => verifEmail_v1(email));
let test2 = testPerf(() => verifEmail_v2(email));
let test3 = testPerf(() => verifEmail_v3(email));

console.log(test1, test2, test3);
