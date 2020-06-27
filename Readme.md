# WebGL Tutorial - Simple WebGL Introduction
## main()
* document canvas element call
```js
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
```js
    callEvent(point);
    callEvent(line);
    callEvent(lineStrip);
    callEvent(lineLoop);
    callEvent(triangle);
    callEvent(triangleStrip);
    callEvent(triangleFan);
```
* add clickEvent
```js
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
```js
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
```js
    if (element.vertexAry == undefined)
        element.vertexAry = [];
```

* click point to vertex
```js
    if (event != null) {

        x = event.layerX - (Number(getComputedStyle(element).width.split("px")[0]) / 2);
        y = -event.layerY + (Number(getComputedStyle(element).height.split("px")[0]) / 2);

        x /= (Number(getComputedStyle(element).width.split("px")[0]) / 2);
        y /= (Number(getComputedStyle(element).height.split("px")[0]) / 2);

        var vertexData = [x, y, 0.0]
        Array.prototype.push.apply(element.vertexAry, vertexData);

    }
```

* first initialize
```js
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