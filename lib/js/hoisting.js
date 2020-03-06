function test() {
    console.log(a);
    console.log(foo());

    let a = 1;
    function foo() {
        return 2;
    }
}

test();

foo();

var foo = function() {
    alert("Hello!");
};