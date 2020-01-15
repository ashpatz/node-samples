'use strict';

class Singleton {
    constructor(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }
}

const singletonInstance = new Singleton();
Object.freeze(singletonInstance);

module.exports = singletonInstance;



// ########### USAGE ###########

import mySingleton from './singleton-es6';
mySingleton.getName(); // Now use your singletons