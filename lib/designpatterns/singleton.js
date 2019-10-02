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

// However, if someone does SingletonClass.instance = "foo"; the singleton is overriden