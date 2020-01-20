export default function draggable (selector) {
    var target = document.querySelector(selector),
        el = target.parentNode,
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
        _on(target, 'mousedown', function (e) {
            let pageX,
                pageY;

            isDragReady = true;

            pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
            pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);

            dragoffset.x = pageX - el.offsetLeft;
            dragoffset.y = pageY - el.offsetTop;
        });

        _on(document, 'mouseup', function () {
            isDragReady = false;
        });

        _on(document, 'mousemove', function (e) {
            let pageX,
                pageY;

            if (!isDragReady) {
                return;
            }
            
            pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
            pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);

            el.style.top = (pageY - dragoffset.y) + "px";
            el.style.left = (pageX - dragoffset.x) + "px";
            el.style.right = null;
        });
    };

    this.init();
};