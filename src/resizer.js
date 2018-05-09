
(function (w, d) {
    var resizer = function () {
        var viewports = {};
        var WINDOW_FEATURES = "menubar=0,location=1,resizable=1,scrollbars=1,status=1";
        var windowObjectReference;
        var onEvent = function (element, eventName, eventCallback) {
            if (element.addEventListener) {
                element.addEventListener(eventName, eventCallback, false);
            }
            else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventCallback);
            }
        };
        var onChange = function (event) {
            var target = event.target;
            var windowWidth = target.value || screen.availWidth;
            if (!windowObjectReference) {
                console.log(WINDOW_FEATURES + ',width=' + windowWidth);
                var disableResizer = (w.location.search ? "&" : "?") + "noresizer=true";
                windowObjectReference = w.open(w.location.href + disableResizer, 'resizer', WINDOW_FEATURES + ',width=' + windowWidth + 'px');
            }
            else {
                windowObjectReference.resizeTo(windowWidth, screen.availHeight);
                windowObjectReference.focus();
            }
        };
        return {
            windowObjectReference: undefined,
            initViewports: function (viewportsObject) {
                var _this = this;
                if (w.location.search && w.location.search.indexOf('noresizer=true')) {
                    return;
                }
                viewports = Object.assign({}, viewportsObject);
                var objKeys = Object.keys(viewports);
                var keysLength = objKeys.length;
                var _rszDom = document.createElement('select');
                _rszDom.id = ['rsz', Date.now()].join('_');
                var htmlBuf = [];
                for (var i = 0; i < keysLength; i++) {
                    var key = objKeys[i];
                    htmlBuf.push('<option value="', viewports[key], '">', key, '</option>');
                }
                _rszDom.innerHTML = htmlBuf.join('');
                onEvent(_rszDom, 'change', onChange);
                var body = d.querySelector('body');
                body.appendChild(_rszDom);
            }
        };
    };
    var rsz = resizer();
    return window.resizerResponsive = rsz;
}(window, document));