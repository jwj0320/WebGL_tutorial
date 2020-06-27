# WebGL Tutorial - Simple WebGL Introduction
## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last version| last version| last version| last version| last version

## main()
* document canvas element call
```javascript
    var point = document.getElementById("point");
    var line = document.getElementById("line");
    var lineStrip = document.getElementById("lineStrip");
    var lineLoop = document.getElementById("lineLoop");
    var triangle = document.getElementById("triangle");
    var triangleStrip = document.getElementById("triangleStrip")
    var triangleFan = document.getElementById("triangleFan")
```
* initialize canvas
point, line, lineStrip, lineLoop, triangle, trianleStrip, 
```javascript
    callEvent(point);
    callEvent(line);
    callEvent(lineStrip);
    callEvent(lineLoop);
    callEvent(triangle);
    callEvent(triangleStrip);
    callEvent(triangleFan);
```
* add clickEvent
```javascript
    point.addEventListener("click", function (event) { callEvent(this, event, gl.POINTS); });
    line.addEventListener("click", function (event) { callEvent(this, event, gl.LINES); });
    lineStrip.addEventListener("click", function (event) { callEvent(this, event, gl.LINE_STRIP); });
    lineLoop.addEventListener("click", function (event) { callEvent(this, event, gl.LINE_LOOP); });
    triangle.addEventListener("click", function (event) { callEvent(this, event, gl.TRIANGLES); });
    triangleStrip.addEventListener("click", function (event) { callEvent(this, event, gl.TRIANGLE_STRIP); });
    triangleFan.addEventListener("click", function (event) { callEvent(this, event, gl.TRIANGLE_FAN); });
```
## callEvent()
* first initialize
```javascript
    if (!initialiseGL(element)) {
        return;
    }
    if (!initialiseBuffer()) {
        return;
    }
    if (!initialiseShaders()) {
        return;
    }
```

* click point initialization
```javascript
    if (element.vertexAry == undefined)
        element.vertexAry = [];
```

* click point to vertex
```javascript
    if (event != null) {

        x = event.offsetX - (Number(getComputedStyle(element).width.split("px")[0]) / 2);
        y = -event.offsetY + (Number(getComputedStyle(element).height.split("px")[0]) / 2);
        
        x /= (Number(getComputedStyle(element).width.split("px")[0]) / 2);
        y /= (Number(getComputedStyle(element).height.split("px")[0]) / 2);

        var vertexData = [x, y, 0.0]
        Array.prototype.push.apply(element.vertexAry, vertexData);

    }
```

## Warning
* code event.layerX and event.layerY is different from browser to browser.
so use event.offsetX and event.offsetY