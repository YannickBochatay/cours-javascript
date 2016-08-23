function $(selecteur) {
    
    var slice = Array.prototype.slice;
    
    return slice.call( document.querySelectorAll(selecteur) );
}