(function() {

    "use strict";

    let textarea = document.querySelector("textarea[name=monTexte]");

    textarea.addEventListener("input",function() {

        localStorage.setItem("maSaisie", this.value);
    });

    textarea.value = localStorage.getItem("maSaisie");

}());
