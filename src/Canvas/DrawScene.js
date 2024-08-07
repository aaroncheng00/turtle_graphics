function drawScene(gl, programInfo, buffer, positions) {
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
  
    // Clear the canvas before we start drawing on it.
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    setPositionAttribute(gl, buffer, programInfo);
  
    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);

    // Set resolution uniform
    gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);

    // Set translation uniform
    let [dx, dy] = getTranslation(gl, positions);
    console.log("translate", dx, dy);
    gl.uniform2f(programInfo.uniformLocations.translation, dx, dy);

    {
      const offset = 0;
      gl.drawArrays(gl.LINES, offset, positions.length / 2);
    }
  }

function getTranslation(gl, positions) {
    var yMax = Number.MIN_SAFE_INTEGER;
    var yMin = Number.MAX_SAFE_INTEGER;
    var xMax = Number.MIN_SAFE_INTEGER;
    var xMin = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < positions.length; i++) {
      if (i % 2 == 0) {
        xMin = Math.min(xMin, positions[i]);
        xMax = Math.max(xMax, positions[i]);
      } else {
        yMin = Math.min(yMin, positions[i]);
        yMax = Math.max(yMax, positions[i]);
      }
      // console.log(xMin, xMax, yMin, yMax);
    }
    var xDiff = (gl.canvas.width / 2) - (xMax + xMin) / 2;
    var yDiff = (gl.canvas.height / 2) - (yMax + yMin) / 2;
    return [xDiff, yDiff];
  }

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
function setPositionAttribute(gl, buffer, programInfo) {
    const numComponents = 2; // pull out 2 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
   
    // Check if the canvas is not the same size.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;
   
    if (needResize) {
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
   
    return needResize;
  }
  
  export { drawScene };