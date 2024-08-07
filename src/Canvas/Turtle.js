class Turtle {
    constructor(position, angle, style) {
        this.position = position;
        this.angle = angle; // in radians
        this.style = style;
        this.stack = []; // [ [position, angle] ]
    }
    nextPoint() {
        var l = this.style.len;
        var nx = l * Math.cos(this.angle) + this.position.x;
        var ny = l * Math.sin(this.angle) + this.position.y;
        return {x: nx, y: ny};
    }
    matchLastState() {
        var rs = this.stack[this.stack.length - 1];
        this.position = rs[0];
        this.angle = rs[1];
    }
    pushCurrentState() {
        var val = [this.position, this.angle];
        this.stack.push(structuredClone(val));
    }
    popState() {
        this.stack.pop();
    }
    getPosition() {
        return this.position;
    }
    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
}

export { Turtle }