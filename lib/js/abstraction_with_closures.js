'use strict';

function User() {
    var name;
    return {
        getName: () => name,
        setName: (newName) => {
            name = newName
        }
    }
}

const user = new User();
user.setName('brandon');
console.log(user.getName());
user.name = 'michael';

console.log(user.getName()); //brandon