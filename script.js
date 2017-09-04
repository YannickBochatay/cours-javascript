;(function() {
    
    "use strict";
    
    function $(selector) {
        
        return Array.prototype.slice.call( document.querySelectorAll(selector) );
    }

    function get(url) {

        return new Promise(function(resolve,reject) {

            var req = new XMLHttpRequest();

            req.open('GET',url,true);

            req.onload = function() {
                if (this.status != 200 && this.status != 0) reject(new Error("Statut http "+this.status+" : "+this.statusText));
                resolve(this.responseText);
            };

            req.onerror = reject;

            req.send(null);
        });
    }

    function downloadExc(exo,type) {

        var path = "exos/"+exo+"/";
        
        var scriptVierge = ";(function() {\n\n    \"use strict\";\n\n    /*\n    * votre code\n    */\n\n}());";
        
        Promise
        .all( [ get(path+"index.html"), get(path+"styles.css"), type == "correction" ? get(path+"script.js") : scriptVierge ] )
        .then(function(files) {

            var zip = new JSZip();
            zip.file("index.html",files[0]);
            zip.file("styles.css",files[1]);
            zip.file("script.js",files[2]);

            return zip.generate({type:"blob"});
        })
        .then(function(blob) {
            saveAs(blob, (type=="correction" ? "correction_" : "") + exo +".zip");
        })
        .catch(alert);

    }
    
    function clickDownload(e) {
        
        e.preventDefault();
        
        var props = this.getAttribute("href").slice(1).split(/\//);
            
        downloadExc( props[0] , props[1] || "template" );
    }
    
    
    $('a.zip').forEach(function(elmt) {
       elmt.addEventListener("click",clickDownload);
    });
    
}());