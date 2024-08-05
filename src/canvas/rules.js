import { rotateRadian, compose } from "./utils.js";

const fractalPlant = {
    v: ["X", "F"],
    constants: ["+", "-", "[", "]"],
    axiom: "X",
    rules: new Map([
        ["X", "F+[[X]-X]-F[-FX]+X"],
        ["F", "FF"],
    ]),
    mapping: new Map([
        ["X", nothing],
        ["F", line],
        ["+", turn(25)],
        ["-", turn(-25)],
        ["[", push],
        ["]", restore]
    ]),
}

const sierpinskiTriangle = {
    v: ["F", "G"],
    constants: ["+", "-"],
    axiom: "F-G-G",
    rules: new Map([
        ["F", "F-G+F+G-F"],
        ["G", "GG"],
    ]),
    mapping: new Map([
        ["F", line],
        ["G", line],
        ["+", turn(120)],
        ["-", turn(-120)],
    ]),
}

const dragonCurve = {
    v: ["F", "G"],
    constants: ["+", "-"],
    axiom: "F",
    rules: new Map([
        ["F", "F+G"],
        ["G", "F-G"],
    ]),
    mapping: new Map([
        ["F", leaf],
        ["G", leaf],
        ["+", turn(90)],
        ["-", turn(-90)],
    ]),
}

const fractalTree = {
    v: ["0", "1"],
    constants: ["[", "]"],
    axiom: "0",
    rules: new Map([
        ["1", "11"],
        ["0", "1[0]0"],
    ]),
    mapping: new Map([
        ["0", line],
        ["1", leaf],
        ["[", compose(turn(45), push)],
        ["]", compose(turn(-45), restore)]
    ]),
}

const functionMap = new Map([
    ["nothing", nothing],
    ["turn", turn],
    ["push", push],
    ["restore", restore],
    ["line", line],
    ["leaf", leaf]
])

function nothing(wrap) {}

function turn(angle) {
    return function(wrap) {
        wrap.turtle.angle = rotateRadian(wrap.turtle.angle, angle);
    }
}

function push(wrap) {
    wrap.turtle.pushCurrentState();
}

function restore(wrap) {
    wrap.turtle.matchLastState();
    wrap.turtle.popState();
}

function line(wrap) {
    var cur = wrap.turtle.getPosition();
    wrap.buffer.push(...[cur.x, cur.y]);
    var nx = wrap.turtle.nextPoint();
    wrap.buffer.push(...[nx.x, nx.y]);
    wrap.turtle.setPosition(nx.x, nx.y);
}

function leaf(wrap) {
    return line(wrap);
}

export { fractalTree, dragonCurve, sierpinskiTriangle, fractalPlant, functionMap }