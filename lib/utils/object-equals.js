'use strict';

const equals = (a, b) => {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        const aProp = a[propName];
        const bProp = b[propName];
        if(typeof aProp === 'object' && typeof bProp === 'object') {
            return equals(aProp, bProp);
        }

        // If values of same property are not equal,
        // objects are not equivalent
        if (aProp !== bProp) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
};

Object.prototype.equals = equals;