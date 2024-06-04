let textarea = document.querySelector("textarea[name=monTexte]");

textarea.addEventListener("input",function(e) {

    localStorage.setItem("maSaisie", e.target.value);
});

textarea.value = localStorage.getItem("maSaisie");
