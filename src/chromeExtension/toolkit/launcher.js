(function (global) {

    var root,
        state,
        isForm,
        interval,
        Draggable;

    Draggable = function (selector) {
        var el = document.querySelector(selector),
            isDragReady = false,
            dragoffset = {
                x: 0,
                y: 0
            };

        function _on(el, event, fn) {
            document.attachEvent ? el.attachEvent('on' + event, fn) : el.addEventListener(event, fn, !0);
        }

        this.init = function () {
            el.style.position = "absolute";
            this.initPosition();
            this.events();
        };

        this.initPosition = function () {
            el.style.top = "1rem";
            el.style.right = "1rem";
        };

        this.events = function () {
            _on(el, 'mousedown', function (e) {
                isDragReady = true;

                e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
                    document.documentElement.scrollLeft :
                    document.body.scrollLeft);
                e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
                    document.documentElement.scrollTop :
                    document.body.scrollTop);

                dragoffset.x = e.pageX - el.offsetLeft;
                dragoffset.y = e.pageY - el.offsetTop;
            });

            _on(document, 'mouseup', function () {
                isDragReady = false;
            });

            _on(document, 'mousemove', function (e) {
                if (!isDragReady) {
                    return;
                }
                
                e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
                    document.documentElement.scrollLeft :
                    document.body.scrollLeft);
                e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
                    document.documentElement.scrollTop :
                    document.body.scrollTop);

                el.style.top = (e.pageY - dragoffset.y) + "px";
                el.style.left = (e.pageX - dragoffset.x) + "px";
                el.style.right = null;
            });
        };

        this.init();
    }

    function destroy() {
        root.parentElement.removeChild(root);
    }

    function toggle() {
        var elem = root.querySelector('[data-hook="gotdibbs-toolbox"]');

        if (elem.style.height === '') {
            elem.style.height = '2rem';
        }
        else {
            elem.style.height = null;
        }
    }

    function show() {
        root = document.querySelector('[data-hook="gotdibbs-toolbox-root"]');

        root.querySelector('[data-hook="gotdibbs-toolbox"]').removeAttribute('style');
        new Draggable('[data-hook="gotdibbs-toolbox"]');

        root.querySelector('[data-hook="gotdibbs-toolbox-close"]').addEventListener('click', destroy);
        root.querySelector('[data-hook="gotdibbs-toolbox-collapse"]').addEventListener('dblclick', toggle);

        interval = setInterval(() => {
            if (!global.GotDibbs) {
                clearInterval(interval);
                return;
            }

            state = global.GotDibbs.getState();

            if (!state) {
                return;
            }

            if (state.context && state.context.Xrm.Page && state.context.Xrm.Page.ui) {
                if (!isForm) {
                    isForm = true;
                    console.log('form');
                }
            }
            else {
                if (isForm) {
                    isForm = false;
                    console.log('!form');
                }
            }
            
            // TODO: filter functions available by form state, version
            // TODO: add panels/tabs for general context information (maybe just an 'i' button?) vs. actions
            // TODO: add styles for flying in/out actions (transitions/animations)
            // TODO: add auto-collapse function and manual button (replace double click)

            // TODO: open solution, open advanced find

            // TODO: evaluate using react?
        }, 500);
    }

    show();

}(this));