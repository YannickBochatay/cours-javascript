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

                current : "00",

                nbQuestions : 0,

                nbQCMs : 13,

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

                        inputs.forEach(function(input) {

                            var label = input.parentNode;

                            input.checked = false;
                            label.classList.remove("ok");
                            label.classList.remove("ko");
                        });

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
                    this.hideResponses();
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

                    function createSpan(html) {

                        var span = document.createElement("span");
                        span.innerHTML = ' ' + html
                        return span
                    }

                    function createInput(html,correct) {

                        var label = document.createElement("label");
                        var input = document.createElement("input");
                        input.setAttribute("type","radio");
                        input.setAttribute("name","q"+i);

                        if (correct) input.dataset.correct = true;

                        label.appendChild(input);
                        label.appendChild(createSpan(html));

                        return label;
                    }

                    function createResponse(content) {

                        var response = document.createElement("div");
                        response.classList.add("response");
                        response.style.display = "none";
                        
                        var icon = document.createElement("i");
                        icon.className = "fa fa-lightbulb-o fa-lg";
                        response.appendChild(icon);

                        response.appendChild( createSpan(content + (content.match(/[.?!]\s*$/) ? "" : ".")) )

                        return response;
                    }

                    var fieldset = document.createElement("fieldset"),
                        code = elmt.querySelector("code"),
                        question = elmt.querySelector("question").innerHTML,
                        choix = slice.call( elmt.querySelectorAll("choix") ),
                        response = elmt.querySelector("reponse");

                    fieldset.appendChild( createTitle() );

                    code && fieldset.appendChild( createCodeSnippet(code.textContent) );

                    fieldset.appendChild( createSpan(question + (question.match(/:\s*$/) ? "" : " :")) );

                    choix.forEach(function(choix) {
                            var text = choix.textContent;
                            var correct = choix.getAttribute("correct") != undefined;
                            fieldset.appendChild( createInput(text,correct) );
                    });

                    response && fieldset.appendChild(createResponse(response.innerHTML))

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

                showResponses : function() {

                    $("form#qcm .response").forEach(function(node) { node.style.display = "block"})
                },

                hideResponses : function() {

                    $("form#qcm .response").forEach(function(node) { node.style.display = "none"})
                },

                genereCommentaire : function(pourcentage) {

                    switch (true) {

                        case (pourcentage < 30) : return "Vous aurez beaucoup de choses à apprendre dans ce cours, accrochez-vous !";
                        case (pourcentage < 50) : return "De nombreux concepts sont à acquérir dans ce cours.";
                        case (pourcentage < 70) : return "Tous les concepts ne sont pas encore clairs, ce cours est fait pour vous !";
                        case (pourcentage < 90) : return "Des notions restent à éclaircir, vous devriez suivre sans problème.";
                        case (pourcentage < 100) : return "Vous connaissez la plupart des notions qui seront abordées.";
                        case (pourcentage  == 100) : return "Passez votre chemin, ce cours ne vous apprendra rien.";
                    }

                },

                enCours : false,

                valide : function() {

                    this.enCours = false;

                    var nbBonnesReponses = this.calculeBonnesReponses();

                    var message = "Votre score : "+nbBonnesReponses+" / "+this.nbQuestions;

                    if (this.current == "00") message+= "\n\n"+this.genereCommentaire( 100 * nbBonnesReponses / this.nbQuestions);

                    this.showResponses();

                    alert(message);
                }
            }

        }());

        var select = document.querySelector('[name=qcm]'),
            suiv = document.getElementById('suiv'),
            prec = document.getElementById('prec');

        qcm.numQCMs = select.options.length;

        function formateNum(num) { return (num < 10 ? "0" : "") + num; }

        function hashchange(e) {

            var numQCM = location.hash.slice(1) || "00";

            qcm.change(numQCM);
            select.value = numQCM;

            numQCM = Number(numQCM);

            if (numQCM <= 0) {
                prec.setAttribute("disabled","disabled");
                prec.href="#"+formateNum(numQCM);
            }
            else {
                prec.removeAttribute("disabled");
                prec.href="#"+formateNum(numQCM-1);
            }

            if (numQCM >= qcm.numQCMs -1) {
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
