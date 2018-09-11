(function(w, d) {
  var resizer = function() {
    var viewports = {};
    var _frameReference;
    var onEvent = function(element, eventName, eventCallback) {
      if (element.addEventListener) {
        element.addEventListener(eventName, eventCallback, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, eventCallback);
      }
    };
    var onChange = function(event) {
      var target = event.target;
      var frameWidth = target.value || screen.availWidth;
      if (frameWidth > screen.availWidth) {
        frameWidth = screen.availWidth;
      }
      _frameReference.setAttribute("width", frameWidth);
    };
    return {
      frameReference: undefined,
      initViewports: function(config) {
        if (w.location.search && w.location.search.indexOf("noresizer=true")) {
          return;
        }
        var body = d.querySelector("body");
        var frameSelector = config.rootElement + "_frame";
        body.innerHTML =
          "<iframe marginheight='0' marginwidth='0' align='middle' frameborder='0' class='__resizer__--frame' id='" +
          frameSelector +
          "' src='" +
          w.location.pathname +
          "?noresizer=true' height='" +
          screen.availHeight +
          "'></iframe>";
        _frameReference = d.getElementById(frameSelector);
        this.frameReference = _frameReference;
        var viewportsObject = config.viewports;
        viewports = Object.assign({}, viewportsObject);
        var objKeys = Object.keys(viewports);
        var keysLength = objKeys.length;
        var _rszDom = document.createElement("select");
        _rszDom.className = "__resizer__";
        _rszDom.id = ["_rsz", Date.now()].join("_");
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
        _rszDom.innerHTML = htmlBuf.join("");
        onEvent(_rszDom, "change", onChange);
        body.appendChild(_rszDom);
      }
    };
  };
  var rsz = resizer();
  window.resizerResponsive = rsz;
})(window, document);
