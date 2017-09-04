/**
 * Améliorations :
 * - efficacité : les fonctions onmousemove et onmouseup sont attachées au document seulement quand on presse le bouton de la souris sur l'élément, puis détachées aussitôt au relâchement de la souris.
 * - réutilisabilité : il est facile de créer de nouveaux éléments mobiles.
 * 
 * Problèmes :
 * - customisation : on ne peut pas lier le dragNdrop à d'autres actions (exemple : afficher un message lorsque l'élément est déplacé dans une zone précise, afficher la position en temps réel de l'élément).
 * 
 * Cette version n'est pas satisfaisante.
 */
(function() {
    
    "use strict";
    
    function dragNdrop(elmt) {
        
        var mouseXinit, mouseYinit, posXinit, posYinit;
        
        function onmousedown(e) {
            
            e.preventDefault();
            
            mouseXinit = e.clientX;
            mouseYinit = e.clientY;
            posXinit = parseInt(elmt.style.left,10);
            posYinit = parseInt(elmt.style.top,10);
            
            document.addEventListener("mousemove",onmousemove);
            document.addEventListener("mouseup",onmouseup);
        }
        
        function onmousemove(e) {
            elmt.style.left = posXinit + (e.clientX - mouseXinit) + "px";
            elmt.style.top = posYinit + (e.clientY - mouseYinit) + "px";
        }
        
        function onmouseup(e) {
            document.removeEventListener("mousemove",onmousemove);
            document.removeEventListener("mouseup",onmouseup);
        }
        
        elmt.addEventListener("mousedown",onmousedown);
    }
    
    var div = document.getElementById("maDiv");
    
    dragNdrop(div);
    
}());