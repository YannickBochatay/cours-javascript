/**
 * Problèmes :
 * - efficacité : les fonctions onmousemove et onmouseup sont liées au document donc exécutées à chaque action de souris (même en dehors du dragNdrop).
 * - réutilisabilité : notre code n'est valable que pour un élément défini en dur, il faut dupliquer le code pour l'appliquer à d'autres éléments.
 * 
 * Cette version n'est pas satisfaisante.
 */
(function() {
    
    "use strict";
    
    var elmt = document.getElementById("maDiv"),
    isPressed = false,
    mouseXinit, mouseYinit, posXinit, posYinit;
    
    function onmousedown(e) {
        
        e.preventDefault();
        
        mouseXinit = e.clientX;
        mouseYinit = e.clientY;
        posXinit = parseInt(elmt.style.left,10);
        posYinit = parseInt(elmt.style.top,10);
        
        isPressed = true;
    }
    
    function onmousemove(e) {
        
        if (!isPressed) return;
        
        elmt.style.left = posXinit + (e.clientX - mouseXinit) + "px";
        elmt.style.top = posYinit + (e.clientY - mouseYinit) + "px";
    }
    
    function onmouseup(e) {
        
        isPressed = false;
    }
    
    elmt.addEventListener("mousedown",onmousedown);
    document.addEventListener("mousemove",onmousemove);
    document.addEventListener("mouseup",onmouseup);
    
}());