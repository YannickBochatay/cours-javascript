(function() {
	
	"use strict";
	
	var slice = Array.prototype.slice;
	
	function $(selector,parent) { return slice.call( (parent ||document).querySelectorAll(selector) ); }
        
        function get(url) {
		
            return new Promise(function(resolve,reject) {

                var req = new XMLHttpRequest();

                req.open('GET',url,true);

                req.onload = function() {
                    if (this.status != 200 && this.status != 0) reject(new Error(this.status+"\n"+this.statusText));
                    resolve(this.responseText);
                };

                req.onerror = reject;

                req.send(null);
            });
	}
        
        
        var qcm = (function() {
            
            return {
                
                current : "01",
                
                nbQuestions : 0,
                
                nbQCMs : 12,
                
                change : function(num) {
                    
                    this.current = num;
                    
                    this.enCours = false;
                    
                    document.title = "QCM "+this.current;
                                        
                    return get("chapitres/"+num+".html").then(this._init.bind(this)).catch(alert);
                },
                
                _getNomStorage : function() {
                    
                    return "qcm"+this.current;
                },
                
                _getFieldSets : function() {
                  
                    return $('form#qcm fieldset');
                },
                
                _sauve : function(donnees) {
                  
                    window.localStorage.setItem( this._getNomStorage(), JSON.stringify(donnees) );
                },
                
                sauve : function() {
                  
                    var donnees = this._getFieldSets().map(function(fieldset,i) {
                        
                        var inputs = $("input",fieldset),
                            checked = fieldset.querySelector("input:checked");
                            
                        return checked ? inputs.indexOf(checked) : -1;   
                    });
                    
                    this._sauve(donnees);
                },
                
                _initFieldSets : function(donnees) {
                    
                    this._getFieldSets().forEach(function(fieldset,i) {
                        
                        var inputs = $("input",fieldset);
                        
                        inputs.forEach(function(input) { input.checked = false; });
                        
                        if (donnees[i] != undefined && donnees[i] != -1) inputs[ donnees[i] ].checked = true;
                    });
                },
                
                recupStorage : function() {
                    
                    var donnees = window.localStorage.getItem( this._getNomStorage() );
                    
                    if (!donnees) return;
                    
                    donnees = JSON.parse(donnees);
                    
                    this._initFieldSets(donnees);
                },
                
                reinit : function() {
                    
                    this._initFieldSets([]);
                    this._sauve([]);
                },
                               
                _createQCM : function(elmt,i) {

                    i++;

                    function createTitle() {

                        var legend = document.createElement("legend");
                        legend.textContent = "Question "+i;
                        return legend;
                    }

                    function createCodeSnippet(codeContent) {

                        var pre = document.createElement("pre"),
                            code = document.createElement("code");

                        code.classList.add("language-javascript");
                        code.textContent = codeContent;
                        pre.appendChild(code);

                        return pre;
                    }

                    function createInput(text,correct) {

                        var label = document.createElement("label");
                        var input = document.createElement("input");
                        input.setAttribute("type","radio");
                        input.setAttribute("name","q"+i);
                        
                        if (correct) input.dataset.correct = true;

                        label.appendChild(input);
                        label.appendChild( document.createTextNode(' '+text) );

                        return label;
                    }

                    var fieldset = document.createElement("fieldset"),
                        code = elmt.querySelector("code"),
                        question = elmt.querySelector("question").textContent,
                        choix = slice.call( elmt.querySelectorAll("choix") );

                    fieldset.appendChild( createTitle() );

                    code && fieldset.appendChild( createCodeSnippet(code.textContent) );

                    fieldset.appendChild( document.createTextNode(question+' : ') );

                    choix.forEach(function(choix) {
                            var text = choix.textContent;
                            var correct = choix.getAttribute("correct") != undefined;
                            fieldset.appendChild( createInput(text,correct) );
                    });
                                        
                    elmt.parentNode.replaceChild(fieldset,elmt);
                },
                                
                _init : function(html) {
                    
                    var div = document.createElement("div");
                    
                    div.innerHTML = html;
                                        
                    var questions = $("qcm",div);
                    
                    questions.forEach(this._createQCM);
                    
                    var parent = document.getElementById("qcm");
                    
                    parent.replaceChild(div,parent.firstElementChild);
                    
                    Prism.highlightAll();
                    
                    this.nbQuestions = questions.length;
                    
                    this.recupStorage();
                },
              
                playSound : function(son) {
                 
                    var audio = new Audio();
                    audio.src = "../wav/"+son+'.wav';
                    audio.play();
                },
                
                calculeBonnesReponses : function() {
                    
                    var nbBonnesReponses = 0;
				
                    $('form#qcm input').forEach(function(input) {

                        var parent = input.parentNode;
                        parent.className = "";

                        if (input.checked) {

                            if ("correct" in input.dataset) {
                                nbBonnesReponses++;
                                parent.classList.add("ok");
                            }
                            else parent.classList.add("ko");
                        }
                    });
                    
                    return nbBonnesReponses;
                },
                
                enCours : false,
                
                valide : function() {
                    
                    this.enCours = false;
                    
                    this.playSound("ok");
                    
                    var nbBonnesReponses = this.calculeBonnesReponses();
                    
                    alert("Votre score : "+nbBonnesReponses+" / "+this.nbQuestions);
                }
            }
            
        }());
        
        var select = document.querySelector('[name=qcm]'),
            suiv = document.getElementById('suiv'),
            prec = document.getElementById('prec');
            
        qcm.numQCMs = select.options.length;
                
        function formateNum(num) { return (num < 10 ? "0" : "") + num; }
			
        function hashchange(e) {
            
            var numQCM = location.hash.slice(1) || "01";

            /*
            if (numQCM != qcm.current && qcm.enCours && !window.confirm("Etes-vous sur de vouloir quitter le QCM en cours ?")) {
                location = e.oldURL;
                return;
            }*/

            qcm.change(numQCM);
            select.value = numQCM;
            
            numQCM = Number(numQCM);

            if (numQCM <=1) {
                prec.setAttribute("disabled","disabled");
                prec.href="#"+formateNum(numQCM);
            }
            else {
                prec.removeAttribute("disabled");
                prec.href="#"+formateNum(numQCM-1);
            }

            if (numQCM >= qcm.numQCMs) {
                suiv.setAttribute("disabled","disabled");
                suiv.href="#"+formateNum(numQCM);
            }
            else {
                suiv.removeAttribute("disabled");
                suiv.href="#"+formateNum(numQCM+1);
            }
        }
	
        select.addEventListener("change",function() {
            window.location.hash = this.value;
	});
        
        hashchange();
        
        document.getElementById("qcm").addEventListener("change",function() {
           qcm.enCours = true;
        });
	
        window.addEventListener("hashchange",hashchange);
        
        var form = document.querySelector("form#qcm");
        				
	form.addEventListener("submit",function(e) {
            e.preventDefault();
            qcm.valide();
	});
        
        form.addEventListener("change",qcm.sauve.bind(qcm));
        
        document.getElementById("reinit").addEventListener("click",qcm.reinit.bind(qcm));        
}());