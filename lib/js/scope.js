for (var i = 0; i < 4; i++) {
    log(i);
}

function log(i) {
    setTimeout(() => console.log(i), 0);
}