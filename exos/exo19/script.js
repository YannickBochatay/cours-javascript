;(function() {
	
    "use strict";
    
    rivets.formatters.url = function(value) {
        return "http://mpfc/#/instructions/"+value;
    }
                
    fetch('http://mpfc/back/modeles/instruction/liste/?page=1&tri=id&sens=desc')
    .then(function(response) {
        return response.json();
    })
    .then(function(instructions) {
        
        rivets.bind(document.body,{instructions:instructions});
    });
    
}());