(function() {

    "use strict";

    let maBiblio = {};

    ///////////////////////////////////////////////////////////////////////////////////////
    class StdConstruct {

        set(opt) {

            for (let n in opt) {

                if (n in this) this[n] = opt[n];
            }
    	}

    	reset() {

            var proto = Object.getPrototypeOf(this);

            for (let n in proto) this[n] = proto[n];
    	}
    }

    maBiblio.StdConstruct = StdConstruct;




    ///////////////////////////////////////////////////////////////////////////////////////
    class DragNdrop extends StdConstruct {

        constructor(elmt,opt) {

            super();

            this.elmt = elmt;

            this.onstart = null;
            this.ondrag = null;
            this.onend = null;
            this._attachedFunction = null;

            if (opt) this.enable(opt);
        }

        enable(opt) {

            this.disable();
            if (opt) this.set(opt);

            let mouseXinit, mouseYinit, posXinit, posYinit;

            let onmousedown = e => {

                e.preventDefault();

                mouseXinit = e.clientX;
                mouseYinit = e.clientY;
                posXinit = parseInt(this.elmt.style.left,10);
                posYinit = parseInt(this.elmt.style.top,10);

                document.addEventListener("mousemove",onmousemove);
                document.addEventListener("mouseup",onmouseup);

                if (this.onstart) this.onstart.call(this.elmt,e);
            }

            let onmousemove = e => {

                this.elmt.style.left = posXinit + (e.clientX - mouseXinit) + "px";
                this.elmt.style.top = posYinit + (e.clientY - mouseYinit) + "px";

                if (this.ondrag) this.ondrag.call(this.elmt,e);
            }

            let onmouseup = e => {

                document.removeEventListener("mousemove",onmousemove);
                document.removeEventListener("mouseup",onmouseup);

                if (this.onend) this.onend.call(this.elmt,e);
            }

            this.elmt.addEventListener("mousedown",onmousedown);

            this._attachedFunction = onmousedown;
        }

        disable() {

            if (!this._attachedFunction) return;

            this.elmt.removeEventListener("mousedown",this._attachedFunction);
            this._attachedFunction = null;
        }

    }

    maBiblio.DragNdrop = DragNdrop;

    window.maBiblio = maBiblio;

}());
