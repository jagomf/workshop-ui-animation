export default class Vector2D {
    _x = 0
    _y = 0
    _angle = 0
    _length = 0

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }


    add(v){
        this.x += v.x;
        this.y += v.y;
    }
    multiply(scalar)
    {
        this.x *= scalar;
        this.y *= scalar;
    }

    get x()
    {
        return this._x;
    }

    set x(x)
    {
        this._x = x;
        this._angle = Math.atan2(this._y, this._x);
        this._length = Math.sqrt((this._x * this._x) + (this._y * this._y));
    }

    get y()
    {
        return this._y;
    }

    set y(y)
    {
        this._y = y;
        this._angle = Math.atan2(this._y, this._x);
        this._length = Math.sqrt((this._x * this._x) + (this._y * this._y));
    }

    get angle()
    {
        return this._angle;
    }

    set angle(angle)
    {
        this._angle = angle;
        this._x = Math.cos(this._angle) * this._length;
        this. _y = Math.sin(this._angle) * this._length;
    }

    get length()
    {
        return this._length;
    }

    set length(length )
    {
        this._length = this.length;
        this._x = Math.cos(this._angle) * this._length;
        this._y = Math.sin(this._angle) * this._length;
    }
}
