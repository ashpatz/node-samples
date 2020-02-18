function findDiff(a, b){
    let charsA = [...a];
    let charsB = [...b];

    let checkObject = {};

    charsB.forEach((char) => {
        let count = checkObject[char];
        if(!count) {
            checkObject[char] = 1;
        } else {
            checkObject[char] = ++count;
        }
    });

    charsA.forEach((char) => {
        let count = checkObject[char];
        if(count && count > 0) {
            if(--count !== 0) {
                checkObject[char] = count;
            } else {
                delete checkObject[char];
            }
        }
    });

    const remainingKeys = Object.keys(checkObject);
    return remainingKeys.length === 1;
};

console.log(findDiff('abab', 'ababa'));