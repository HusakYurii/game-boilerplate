/**
 * @class Vector2D
 */
Math.Vector2D = class Vector2D {
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(val) {
        this._x = val;
    }
    get y() {
        return this._y;
    }

    set y(val) {
        this._y = val;
    }

    set({ x = this._x, y = this._y } = {}) {
        this.x = x;
        this.y = y;
        return this;
    }

    copy() {
        return new Vector2D(this._x, this._y);
    }

    add({ x = 0, y = 0 } = {}) {
        this._x += x;
        this._y += y;
        return this;
    }

    subtract({ x = 0, y = 0 } = {}) {
        this._x -= x;
        this._y -= y;
        return this;
    }

    getDistanceTo(vector) {
        return vector.copy().subtract(this).getMagnitude();
    }

    getAngleTo(vector) {
        return vector.copy().subtract(this).getAngle();
    }

    multiply(val) {
        this.x *= val;
        this.y *= val;
        return this;
    }

    divide(val) {
        if (val === 0) {
            console.warn('can not be divided by 0');
            return this;
        }
        this.x /= val;
        this.y /= val;
        return this;
    }

    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    setAngle(angle) {
        var mag = this.getMagnitude();
        this.x = Math.cos(angle) * mag;
        this.y = Math.sin(angle) * mag;
        return this;
    }

    setLimit(max) {
        var mag = this.getMagnitude();
        if (mag > max) this.multiply(1 / mag).multiply(max);
        return this;
    }

    setMagnitude(val) {
        return this.normalize().multiply(val);
    }

    getMagnitude() {
        return Math.sqrt(this.magSqrt());
    }

    normalize() {
        const mag = this.getMagnitude();
        if (mag !== 0) this.multiply(1 / mag);
        return this;
    }

    magSqrt() {
        const x = this.x;
        const y = this.y;
        return x * x + y * y;
    }

    static create({ x = 0, y = 0 } = {}) {
        return new Vector2D(x, y);
    }

    static createFromAngle(angle) {
        return this.create({ x: 1, y: 1 })
            .normalize()
            .setAngle(angle);
    }

    static copyVector({ x = 0, y = 0 } = {}) {
        return new Vector2D(x, y);
    }

    static getDirection(from, to) {
        const angle = from.getAngleTo(to);
        const vector = Vector2D.createFromAngle(angle);
        return vector.normalize();
    }

    static getDistance(from, to) {
        return Math.sqrt(Vector2D.getDistanceSqrt(from, to));
    }

    static getDistanceSqrt(from, to) {
        return from.copy().subtract(to).magSqrt();
    }
}

Math.randomInt = function (min = 0, max = Number.MAX_SAFE_INTEGER) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Math.randomFloat = function (min = 0, max = 1) {
    return (Math.random() * (max - min)) + min;
};

Math.randomColor = function (prefix = "0x") {
    return `${prefix}${Math.random().toString(16).slice(2, 8)}`;
};
