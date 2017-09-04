var calculatrice = (function(){
  
  var memoire = [];
                 
  function stockeEnMemoire(val) { memoire.push(val); return val; }
  
  return {
    ajouter : function(a,b) { return stockeEnMemoire(a+b); },
    soustraire : function(a,b) { return stockeEnMemoire(a-b); },
    recupMemoire : function() { return memoire.pop(); }
  };
  
})();