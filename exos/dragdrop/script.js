;(function() {
    
    "use strict";
    
    var versions = [{
            nom:"01",
            files : []
    },{
            nom:"02",
            files : []
    },{
            nom:"03",
            files : []
    },{
            nom:"04",
            files : []
    },{
            nom:"05",
            files : []
    },{
            nom:"06",
            files :["dragdrop.js"]
    },{
            nom:"07",
            files : ["maBiblio.js"]
    },{
            nom:"08",
            files : ["maBiblio.js"]
    },{
            nom:"09",
            files : ["maBiblio.js"]
    },{
            nom:"10",
            files : ["maBiblio.js"]
    },{
            nom:"11",
            files : ["maBiblio.js","events.js"]
    }];

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


    function downloadVersion(version) {

        var files = commonFiles.concat(version.files),
            path = version.nom+"/";
    
        Promise.all( files.map(function(file) { return get(path+file); })  )
        .then(function(contents) {

            var zip = new JSZip();
            
            files.forEach(function(file,i) {
                zip.file(file,contents[i]);
            });
            
            return zip.generate({type:"blob"});
        })
        .then(function(blob) {
            saveAs(blob, "dragndrop_v"+version.nom+".zip");
        })
        .catch(alert);
    }


    var commonFiles = ["index.html","script.js"];
    
    
    var ul = document.querySelector("ul#versions");
    
    var modele = document.querySelector("li#modele");
    
    modele.parentNode.removeChild(modele);
    modele.removeAttribute("id");
    
    versions.forEach(function(version) {
        
        var li = modele.cloneNode(true);
        var a = li.querySelector("a");
                
        a.addEventListener("click",function(e) {
            e.preventDefault();
            downloadVersion(version);
        });
        
        a.querySelector("span").textContent = version.nom;
        
        ul.appendChild(li);
        
    });
    
}());