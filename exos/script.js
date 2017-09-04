(function() {
	
	"use strict";
		
	var $ = document.querySelector.bind(document);
	
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
		
	function stripTags(str) {
		
	    return str.replace(/<\/?([a-z]\w*)\b[^>]*>/gi,'');
	}
	
	
	
	
	var exo = (function() {
		
		var divIntitule = $('#intitule'),
		
			divCorrige = $('#divCorrige'),
			
			contenuCorrection = CodeMirror(document.getElementById('corrige'), {
				mode:  "javascript",
				lineNumbers : true,
				readOnly:true
			}),
			
			codeEditor = CodeMirror.fromTextArea( document.getElementById('editeur'), {
				mode:  "javascript",
				lineNumbers : true
			}),
		
			ulLog = $('#log ul');
		
		
		var exo = {
			
			current : '01',
                        			
			nbtry : 0,
			
			nbmin : 3,
						
			editeur : codeEditor.getDoc(),
			
			nbTests : 0,
			
			contientErreurs : false,
			
			succes : false,
			
			change : function(numExo) {
				
                            this.current = numExo;

                            this.nbtry = 0;
                            this.succes = false;

                            this.masqueCorrige();

                            this.supprLog();

                            document.title = "Exercice "+this.current;

                            return Promise.all([ this._initIntitule(), this._initEditeur() ]);
			},
                        
			sauve : function() {
				
				localStorage.setItem( this._getExo(), this.editeur.getValue() );
			},
			
			recup : function() {
				
				return localStorage.getItem( this._getExo() );
			},
			
			_log : function(str) {
				
				var li = document.createElement("li");
				
				li.innerHTML = str; 
				
				ulLog.appendChild(li);
				
				return li;
				
			},
			
			log : function() {
				
				Array.prototype.forEach.call(arguments,this._log);
			},
			
			supprLog : function() {
				
				while(ulLog.firstChild) ulLog.removeChild(ulLog.firstChild);
			},
			
			assert : function(shoulBeTrue,message) {
				
				var statut = shoulBeTrue ? "OK" : "erreur";
				
				if (!shoulBeTrue) this.contientErreurs = true;
						
				this.log(message + " : <span class='"+statut+"'> "+statut+"</span>");
				
				this.nbTests++;
			},
			
			_exec : function(tests) {
				
				try {
					
					eval( this.editeur.getValue() + ';' + tests);
					
					if (!this.contientErreurs) {
						this.succes = true;
						this.log( !this.nbTests ? "Pas de test possible pour cet exercice" : "Les tests ont été passés avec succès.");
					}
				}
				catch(e) {
					this.log('<span class="erreur">'+e+'</span>');
				}
			},
			
			teste : function() {
				
				this.contientErreurs = false;
				this.succes = false;
				this.nbTests = 0;
				
				this.supprLog();
				
				this.nbtry++;
				
				this._getTests().then(this._exec.bind(this));
			},
						
			afficheCorrige : function() {
				
				if (!this.succes && this.nbtry < this.nbmin) {
					window.alert("Faites au moins 3 essais SVP.");
					return;
				}
				
				if (!window.confirm("Etes-vous sûr de vouloir afficher le corrigé ?")) return;
				
				this._afficheCorrige();
			},
			
			masqueCorrige : function() {
				divCorrige.style.display = "none";
			},
			
			exporter : function() {
				
				return this._exporter().then(function(url) { window.open(url); });
			},
			
			_exporter : function() {
				
				var that = this;
				
				function addComment(str) { return '/*' + str + '\n*/\n'; }
				
				return Promise.all([ this._getIntitule(), this.editeur.getValue(), this._getCorrige() ])
				.then(function(resul) {
					
					var str = addComment('\nExercice n°' + that.current + '\n' + stripTags(resul[0]))
						+"\n\n"
						+resul[1]
						+"\n\n"
						+addComment("Corrigé\n"+resul[2]);
					
					return "data:text/javascript;base64," + btoa(str);
				});
			},
			
			_afficheCorrige : function() {
				
				return this._getCorrige().then(function(content) {
					divCorrige.style.display = "block";
					contenuCorrection.getDoc().setValue(content);
				});
			},
			
			_getExo : function() {
				return "exo" + this.current;
			},
			
			_getPath : function() {
				
				return this._getExo() + "/";
			},
			
			_reinitEditeur : function() {
				
				var that = this;
				
				return this._getInit().then(function(content) {
					that.editeur.setValue(content);
				});
			},
			
			reinitEditeur : function() {
				
				if (this.editeur.getValue() && !window.confirm("Etes-vous sûr de vouloir remplacer le contenu actuel ?")) return Promise.resolve();
				
				return this._reinitEditeur();
			},
			
			_getIntitule : function() {
				
				return get( this._getPath() + "intitule.html");
			},
			
			_getTests : function() {
				
				return get( this._getPath() + "tests.js");
			},
			
			_getInit : function() {
				
				return get( this._getPath() + "init.js");
			},
			
			_getCorrige : function() {
				
				return get( this._getPath() + "corrige.js" );
			},
			
			_initIntitule : function() {
				
				this._getIntitule().then(function(intitule) {
					divIntitule.innerHTML = intitule;
				});
			},
			
			_initEditeur : function() {
				
				var storedValue = this.recup();
				
				var promise = storedValue ? Promise.resolve(storedValue) : this._reinitEditeur();
				
				var that = this;
				
				return promise.then(function(content) {
					that.editeur.setValue(content);
				});
			},
                        
                        numPrecedant : function() {
                          
                            var ind = this.listeExos.indexOf(this.current);
                            
                            return (ind == 0) ? false : this.listeExos[ind-1];
                        },
                        
                        numSuivant : function() {
                            
                            var ind = this.listeExos.indexOf(this.current);
                            
                            return (ind == this.listeExos.length-1) ? false : this.listeExos[ind+1];
                        }
		};
		
		codeEditor.on("change",exo.sauve.bind(exo));
		
		return exo;
		
	}());
        
        var assert = exo.assert.bind(exo);
        
        var select = $('[name=exo]'),
            suiv = $('#suiv'),
            prec = $('#prec');            
            
        exo.listeExos = [].slice.call(select.options).map(function(option) { return option.value; });
                        
        function hashchange() {
            
            var numExo = location.hash.slice(1) || "01",
                numPrec, numSuiv;
            
            exo.change(numExo);
            select.value = numExo;
            
            numPrec = exo.numPrecedant();
            numSuiv = exo.numSuivant();
            
            if (numPrec === false) {
                prec.setAttribute("disabled","disabled");
                prec.href="#"+numExo;
            }
            else {
                prec.removeAttribute("disabled");
                prec.href="#"+numPrec;
            }

            if (numSuiv === false) {
                suiv.setAttribute("disabled","disabled");
                suiv.href="#"+numExo;
            }
            else {
                suiv.removeAttribute("disabled");
                suiv.href="#"+numSuiv;
            }
        }
        		
        select.addEventListener("change",function() {
            window.location.hash = this.value;
	});
	
        window.addEventListener("hashchange",hashchange);
        
	$('form#exo').addEventListener('submit',function(e) {
            e.preventDefault();
            exo.teste();
	});
		
	$('#voirCorrige').addEventListener("click",function(e) {
		e.preventDefault();
		exo.afficheCorrige();
	});
	
	$('#reinit').addEventListener("click",function(e) {
		e.preventDefault();
		exo.reinitEditeur();
	});
	
	$('#exporter').addEventListener("click",function(e) {
		e.preventDefault();
		exo.exporter();
	});
        
        hashchange();
}());
	
	
	