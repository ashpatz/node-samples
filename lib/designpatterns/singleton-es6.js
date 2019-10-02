'use strict';

class Singleton {
    constructor(){
    }

    method1(){

    }

    method2(){

    }
}

const singletonInstance = new Singleton();
Object.freeze(singletonInstance);

module.exports = singletonInstance;



// ########### USAGE ###########

import mySingleton from './singleton-es6';
mySingleton.method1(); // Now use your singletons