import { Turtle } from "./Turtle.js"
import { toRadian } from "./Utils.js";

// apply rules to generate next state
function generateNextShape(rule, shape) {
  var next = "";
  for (let i = 0; i < shape.length; i++) {
    let mp = rule.rules;
      if (mp.has(shape[i])) {
          next += mp.get(shape[i]);
      } else {
          next += shape[i];
      }
  }
  return next;
}

// position, angle, stack
function generatePositions(rule, shape, startInfo, style) {
    /*
    iterate over each character in shape:
      apply corresponding function (matching[c])
      update stack and current position accordingly
      draw if necessary
    */
   var start = startInfo.pos;
   var startAngle = startInfo.angle;
   var buffer = [];
   var turtle = new Turtle(start, toRadian(startAngle), style);
   var wrap = {buffer: buffer, turtle: turtle};
   for (let i = 0; i < shape.length; i++) {
    var cur = shape[i];
    try {
      rule.mapping.get(cur)(wrap);
    } catch (err) {
      console.log("error generating positions, check that push and restore/pop operations are matched:", err);
      return [];
    }
   }
   return buffer;
}

export { generateNextShape, generatePositions }