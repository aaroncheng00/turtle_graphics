import { rotateRadian, compose } from "./Utils.js";

class Rules {
    constructor(
        variables,
        constants,
        axiom,
        rules,
        mapping
    ) {
        this.variables = variables;
        this.constants = constants;
        this.axiom = axiom;
        this.rules = rules;
        this.mapping = mapping;
    }
}

const fractalPlant = new Rules(
    ["X", "F"],
    ["+", "-", "[", "]"],
    "X",
    new Map([
        ["X", "F+[[X]-X]-F[-FX]+X"],
        ["F", "FF"],
    ]),
    new Map([
        ["X", nothing],
        ["F", line],
        ["+", turn(25)],
        ["-", turn(-25)],
        ["[", push],
        ["]", restore]
    ]),
)

const sierpinskiTriangle = new Rules(
    ["F", "G"],
    ["+", "-"],
    "F-G-G",
    new Map([
        ["F", "F-G+F+G-F"],
        ["G", "GG"],
    ]),
    new Map([
        ["F", line],
        ["G", line],
        ["+", turn(120)],
        ["-", turn(-120)],
    ]),
)

const dragonCurve = new Rules(
    ["F", "G"],
    ["+", "-"],
    "F",
    new Map([
        ["F", "F+G"],
        ["G", "F-G"],
    ]),
    new Map([
        ["F", leaf],
        ["G", leaf],
        ["+", turn(90)],
        ["-", turn(-90)],
    ]),
)

const fractalTree = new Rules(
    ["0", "1"],
    ["[", "]"],
    "0",
    new Map([
        ["1", "11"],
        ["0", "1[0]0"],
    ]),
    new Map([
        ["0", line],
        ["1", leaf],
        ["[", compose(turn(45), push)],
        ["]", compose(turn(-45), restore)]
    ]),
)

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

export { fractalTree, dragonCurve, sierpinskiTriangle, fractalPlant, functionMap, Rules }