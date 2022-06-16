(function() {

    "use strict";

    let tdX = document.getElementById("abcisse"),
        tdY = document.getElementById("ordonnee"),
        tdTag = document.getElementById("balise"),
        descriptElmt = document.getElementById("descriptElmt");

    document.addEventListener("mousemove",function(e) {

        tdX.textContent = e.clientX;
        tdY.textContent = e.clientY;
        tdTag.textContent = e.target.tagName;
    });

    document.addEventListener("click",function(e) {

        let target = e.target,
            str = "";

        for (let n in target) str+= `${n} : ${target[n]}\n`;

        descriptElmt.textContent = str;
    });

}());
