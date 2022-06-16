(function() {

    "use strict";

    let input = document.getElementById("titrePage");

    input.addEventListener("input",function(e) {

        document.title = e.target.value;
    });

}());
