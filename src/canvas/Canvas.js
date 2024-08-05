import './Canvas.css';
import { useRef, useEffect } from 'react';
import { drawScene } from "./drawScene.js";
import { vsSource, fsSource } from "./shaders.js";
import { generateNextShape, generatePositions } from "./graphics.js";
import { fractalTree, dragonCurve, sierpinskiTriangle, fractalPlant } from "./rules.js";

export default function Canvas({ presetChoice, shapeLength, shapeSize }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        //draw canvas
        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl");
        if (gl == null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
    
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    
        const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    
        // Collect all the info needed to use the shader program.
        const programInfo = {
            program: shaderProgram,
            attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, "a_position"),
            },
            uniformLocations: {
            resolution: gl.getUniformLocation(shaderProgram, "u_resolution"),
            translation: gl.getUniformLocation(shaderProgram, "u_translation"),
            },
        };
        // Create a buffer for vertex positions.
        const positionBuffer = gl.createBuffer();
      
        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            
        // Initialize drawing to default shape
        updateShape(gl, programInfo, positionBuffer, presetChoice, shapeLength, shapeSize);
    });
    return <canvas ref={canvasRef} className='Canvas'/>;
}

function updateShape(gl, programInfo, positionBuffer, newShape, newLength, newSize) {
  // Generate initial shape
  const curShape = getConfig(gl).get(newShape);
  const rule = curShape.rule;
  var shape = rule.axiom;
  var style = { len: newLength };
  for (let i = 0; i < newSize; i++) {
    shape = generateNextShape(rule, shape);
  }
  console.log("shape:", shape.length, shape);
  
  // Generate initial vertex positions
  const positions = generatePositions(rule, shape, curShape.start, style);
  console.log("pos:", positions);

  // Buffer position data into positionBuffer (bound to ARRAY_BUFFER)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Draw scene
  drawScene(gl, programInfo, positionBuffer, positions);
}

/**
 * Get L-system starting info
 * @param {*} gl 
 * @returns 
 */
function getConfig(gl) {
  var width = gl.canvas.clientWidth;
  var height = gl.canvas.clientHeight;
  return new Map([
    ["dragonCurve", {
      rule: dragonCurve,
      start: { pos: { x: width / 2, y: height / 2 }, angle: 0 }
    }],
    ["fractalTree", {
      rule: fractalTree,
      start: { pos: { x: width / 2, y: 0 }, angle: 90 }
    }],
    ["sierpinskiTriangle", {
      rule: sierpinskiTriangle,
      start: { pos: { x: width / 2, y: height / 2 }, angle: 0 }
    }],
    ["fractalPlant", {
      rule: fractalPlant,
      start: { pos: { x: width / 2, y: 0 }, angle: 90 }
    }]
  ])
}

/**
 * Initialize a shader program, so WebGL knows how to draw our data
 * @param {*} gl 
 * @param {*} vsSource 
 * @param {*} fsSource 
 * @returns 
 */
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  
    // Create the shader program
  
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
    // If creating the shader program failed, alert
  
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert(
        `Unable to initialize the shader program: ${gl.getProgramInfoLog(
          shaderProgram
        )}`
      );
      return null;
    }
  
    return shaderProgram;
}
  
/**
 * Creates a shader of the given type, uploads the source and compiles it
  * @param {*} gl 
  * @param {*} type 
  * @param {*} source 
  * @returns 
  */
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}