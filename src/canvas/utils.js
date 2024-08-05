function toRadian(x) {
    return x * Math.PI / 180;
}
function rotateRadian(angle, x) {
    return (angle + toRadian(x)) % (2 * Math.PI);
}

const compose = (...fns) => {
    return (input) => {
        fns.reduceRight((acc, fn) => {
            return fn(input);
        }, input);
    };
};

export { toRadian, rotateRadian, compose }