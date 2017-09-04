(function() {
	
    "use strict";
    
    rivets.formatters.url = function(value) {
        return "http://mpfc.meteo.fr/#/instructions/"+value;
    }
                
    fetch('http://mpfc.meteo.fr/back/modeles/instruction/liste/?page=1&tri=id&sens=desc')
    .then(function(response) {
        return response.json();
    })
    .then(function(instructions) {
        
        rivets.bind(document.body,{instructions:instructions});
    });
    
}());
