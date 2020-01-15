'use strict';

//load Object.equals

class Shape {

    constructor(target) {
        this._color = target.color;
    }

    clone() {throw new TypeError("not implemented!");} // if in Java, will be abstract and mandatory in subclass

}


class Circle extends Shape {

    constructor(target) {
        super(target);
        this._radius = target.radius;
    }

    clone(source) {
        return new Circle(source);
    }
}