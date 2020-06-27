var gl;

function testGLError(functionLastCalled) {
    /* gl.getError returns the last error that occurred using WebGL for debugging */
    var lastError = gl.getError();

    if (lastError != gl.NO_ERROR) {
        alert(functionLastCalled + " failed (" + lastError + ")");
        return false;
    }
    return true;
}


function initialiseGL(canvas) {
    try {
        // Try to grab the standard context. If it fails, fallback to experimental
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    catch (e) {
    }

    if (!gl) {
        alert("Unable to initialise WebGL. Your browser may not support it");
        return false;
    }
    return true;
}

var shaderProgram;

function initialiseBuffer() {

    var vertexData = [];

    // Generate a buffer object
    gl.vertexBuffer = gl.createBuffer();
    // Bind buffer as a vertex buffer so we can fill it with data
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
    /* Set the buffer's size, data and usage */
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
    return testGLError("initialiseBuffers");
}

function initialiseShaders() {

    var fragmentShaderSource = '\
			void main(void) \
			{ \
				gl_FragColor = vec4(1.0, 0.2, 0.66, 1.0); \
			}';

    gl.fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(gl.fragShader, fragmentShaderSource);
    gl.compileShader(gl.fragShader);
    // Check if compilation succeeded
    if (!gl.getShaderParameter(gl.fragShader, gl.COMPILE_STATUS)) {
        alert("Failed to compile the fragment shader.\n" + gl.getShaderInfoLog(gl.fragShader));
        return false;
    }
    // Vertex shader code
    var vertexShaderSource = '\
			attribute highp vec4 myVertex; \
			uniform mediump mat4 transformationMatrix; \
			void main(void)  \
			{ \
                gl_Position = transformationMatrix * myVertex; \
                gl_PointSize = 4.0;\
			}';

    gl.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(gl.vertexShader, vertexShaderSource);
    gl.compileShader(gl.vertexShader);
    // Check if compilation succeeded
    if (!gl.getShaderParameter(gl.vertexShader, gl.COMPILE_STATUS)) {
        alert("Failed to compile the vertex shader.\n" + gl.getShaderInfoLog(gl.vertexShader));
        return false;
    }

    // Create the shader program
    gl.programObject = gl.createProgram();
    // Attach the fragment and vertex shaders to it
    gl.attachShader(gl.programObject, gl.fragShader);
    gl.attachShader(gl.programObject, gl.vertexShader);
    // Bind the custom vertex attribute "myVertex" to location 0
    gl.bindAttribLocation(gl.programObject, 0, "myVertex");
    // Link the program
    gl.linkProgram(gl.programObject);
    // Check if linking succeeded in a similar way we checked for compilation errors
    if (!gl.getProgramParameter(gl.programObject, gl.LINK_STATUS)) {
        alert("Failed to link the program.\n" + gl.getProgramInfoLog(gl.programObject));
        return false;
    }

    gl.useProgram(gl.programObject);

    return testGLError("initialiseShaders");
}


//main
function main() {
    // document canvas element call
    var point = document.getElementById("point");
    var line = document.getElementById("line");
    var lineStrip = document.getElementById("lineStrip");
    var lineLoop = document.getElementById("lineLoop");
    var triangle = document.getElementById("triangle");
    var triangleStrip = document.getElementById("triangleStrip")
    var triangleFan = document.getElementById("triangleFan")

    // initialize canvas
    callEvent(point);
    callEvent(line);
    callEvent(lineStrip);
    callEvent(lineLoop);
    callEvent(triangle);
    callEvent(triangleStrip);
    callEvent(triangleFan);

    // add clickEvent
    point.addEventListener("click", function (event) { callEvent(this, event, gl.POINTS); });
    line.addEventListener("click", function (event) { callEvent(this, event, gl.LINES); });
    lineStrip.addEventListener("click", function (event) { callEvent(this, event, gl.LINE_STRIP); });
    lineLoop.addEventListener("click", function (event) { callEvent(this, event, gl.LINE_LOOP); });
    triangle.addEventListener("click", function (event) { callEvent(this, event, gl.TRIANGLES); });
    triangleStrip.addEventListener("click", function (event) { callEvent(this, event, gl.TRIANGLE_STRIP); });
    triangleFan.addEventListener("click", function (event) { callEvent(this, event, gl.TRIANGLE_FAN); });


    requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000, 60);
            };
    })();

}


//click event processing
function callEvent(element, event, type) {

    if (!initialiseGL(element)) {
        return;
    }
    if (!initialiseBuffer()) {
        return;
    }
    if (!initialiseShaders()) {
        return;
    }

    //click point initialization
    if (element.vertexAry == undefined)
        element.vertexAry = [];

    //click point to vertex
    if (event != null) {

        x = event.layerX - (Number(getComputedStyle(element).width.split("px")[0]) / 2);
        y = -event.layerY + (Number(getComputedStyle(element).height.split("px")[0]) / 2);

        x /= (Number(getComputedStyle(element).width.split("px")[0]) / 2);
        y /= (Number(getComputedStyle(element).height.split("px")[0]) / 2);

        var vertexData = [x, y, 0.0]
        Array.prototype.push.apply(element.vertexAry, vertexData);

    }
    // Generate a buffer object
    gl.vertexBuffer = gl.createBuffer();
    // Bind buffer as a vertex buffer so we can fill it with data
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
    // Set the buffer's size, data and usage 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(element.vertexAry), gl.STATIC_DRAW);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var matrixLocation = gl.getUniformLocation(gl.programObject, "transformationMatrix");
    var transformationMatrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];

    gl.uniformMatrix4fv(matrixLocation, gl.FALSE, transformationMatrix);

    if (!testGLError("gl.uniformMatrix4fv")) {
        return false;
    }

    // Enable the user-defined vertex array
    gl.enableVertexAttribArray(0);
    // Set the vertex data to this attribute index, with the number of floats in each position
    gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 0, 0);

    if (!testGLError("gl.vertexAttribPointer")) {
        return false;
    }

    gl.drawArrays(type, 0, element.vertexAry.length / 3);
    if (!testGLError("gl.drawArrays")) {
        return false;
    }
}

//select tag event
document.getElementById("selectGl").addEventListener("change", function (event) {
    document.getElementById("div_point").hidden = true;
    document.getElementById("div_line").hidden = true;
    document.getElementById("div_lineStrip").hidden = true;
    document.getElementById("div_lineLoop").hidden = true;
    document.getElementById("div_triangle").hidden = true;
    document.getElementById("div_triangleStrip").hidden = true;
    document.getElementById("div_triangleFan").hidden = true;

    document.getElementById("div_" + this.value).hidden = false;
})
