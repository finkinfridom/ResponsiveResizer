(function(w, d) {
  var resizer = function() {
    var viewports = {};
    var _wrapReference;
    var onEvent = function(element, eventName, eventCallback) {
      if (element.addEventListener) {
        element.addEventListener(eventName, eventCallback, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, eventCallback);
      }
    };
    var onResize = function() {
      _wrapReference
        .querySelector("iframe")
        .setAttribute(
          "height",
          w.innerHeight - _wrapReference.querySelector("iframe").offsetTop - 2
        );
    };
    var onChange = function(event) {
      var target = event.target;
      var frameWidth = target.value || w.innerWidth;
      var text = target.selectedOptions[0].text;
      if (frameWidth > w.innerWidth) {
        frameWidth = w.innerWidth;
        text = "MAX";
      }
      _wrapReference.querySelector("iframe").setAttribute("width", frameWidth);
      _wrapReference.setAttribute("style", "width:" + frameWidth + "px");
      _wrapReference.querySelector("span").innerText = [
        text,
        "=> ",
        frameWidth
      ].join("");
    };
    return {
      wrapReference: undefined,
      initViewports: function(config) {
        if (w.location.search && w.location.search.indexOf("noresizer=true")) {
          return;
        }
        var viewportsObject = config.viewports;
        var body = d.querySelector("body");
        var wrapSelector = config.rootElement + "_wrap";
        var _rszWrap = d.createElement("div");
        _rszWrap.id = wrapSelector;
        _rszWrap.className = "__resizer__--wrap";
        var _rszFrame = d.createElement("iframe");
        _rszFrame.setAttribute("marginheight", 0);
        _rszFrame.setAttribute("marginwidth", 0);
        _rszFrame.setAttribute("frameborder", 0);
        _rszFrame.className = "__resizer__--frame";
        _rszFrame.setAttribute("src", w.location.pathname + "?noresizer=true");
        var _rszSelect = d.createElement("select");
        _rszSelect.className = "__resizer__--select";
        var _rszLabel = d.createElement("span");
        _rszLabel.className = "__resizer__--info";
        viewports = Object.assign({}, viewportsObject);
        var objKeys = Object.keys(viewports);
        var keysLength = objKeys.length;
        if (keysLength) {
          var firstWidth = viewports[objKeys[0]];
          _rszFrame.setAttribute("width", firstWidth);
          _rszWrap.setAttribute("style", "width:" + firstWidth + "px");
          _rszLabel.innerText = [objKeys[0], "=> ", firstWidth].join("");
        }
        var htmlBuf = [];
        for (var i = 0; i < keysLength; i++) {
          var key = objKeys[i];
          htmlBuf.push(
            '<option value="',
            viewports[key],
            '">',
            key,
            "</option>"
          );
        }
        _rszSelect.innerHTML = htmlBuf.join("");
        _rszWrap.appendChild(_rszSelect);
        _rszWrap.appendChild(_rszLabel);
        _rszWrap.appendChild(_rszFrame);
        _rszFrame.setAttribute(
          "height",
          w.innerHeight - _rszFrame.offsetTop - 2
        );
        body.innerHTML = _rszWrap.outerHTML;
        _wrapReference = d.getElementById(wrapSelector);
        _rszSelect = _wrapReference.querySelector("select");
        onEvent(_rszSelect, "change", onChange);
        onEvent(w, "resize", onResize);
        this.wrapReference = _wrapReference;
      }
    };
  };
  var rsz = resizer();
  window.resizerResponsive = rsz;
})(window, document);
