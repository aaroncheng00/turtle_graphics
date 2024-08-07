// Vertex shader program
const vsSource = `
attribute vec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_translation;
void main() {
  // center positions in pixel space
  vec2 afterTranslation = a_position + u_translation;

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = afterTranslation / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = zeroToTwo - vec2(1.0, 1.0);

  gl_Position = vec4(clipSpace, 0, 1);
}
`;

const fsSource = `
void main() {
  gl_FragColor = vec4(1.0, 0, 0.5, 1.0);
}
`;

export { vsSource, fsSource };