(function() {

    "use strict";

    let input = document.getElementById("titrePage");

    input.addEventListener("input",function() {

        document.title = this.value;
    });

}());
