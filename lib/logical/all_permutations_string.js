'use strict';

function permutations (str) {
    permutations2(str, '');
};

function permutations2(str, collector) {
    if(str.length == 0) {
        console.log(collector);
    } else {
        for(let i = 0; i < str.length; i++) {
            const currentChar = str.charAt(i);
            const collector2 = `${collector}${currentChar}`;
            const remainingString = str.substring(0, i) + str.substring(i+1);
            permutations2(remainingString, collector2);
        }
    }
}

console.log(permutations('man'));