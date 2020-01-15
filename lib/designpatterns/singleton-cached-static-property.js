'use strict';

// https://dev.to/tomekbuszewski/singleton-in-javascript-1d5i
// https://robdodson.me/javascript-design-patterns-singleton/

class SingletonClass {
    constructor(name = '') {
        if (!!SingletonClass.instance) {
            return SingletonClass.instance;
        }

        SingletonClass.instance = this;

        this.name = name;

        return this;
    }

    getName() {
        return this.name;
    }
}

const singleton1 = new SingletonClass('ajay');
const singleton2 = new SingletonClass('vijay');

console.log(singleton2.getName());
console.log(singleton1 === singleton2);

// However, if someone does SingletonClass.instance = "foo"; the singleton is overriden
SingletonClass.instance = 'abc';
const singleton3 = new SingletonClass('sujay');
console.log(singleton3);
console.log(singleton1 === singleton3);

