const twoDimensionArr = [];

function solution(B) {
    const len = B.length;
    let oYaxis, oXaxis;

    const result = 0;

    for (let i = 0; i < len; i++) {

        const str = B[i];
        const innerArr = [];
        for (let j = 0; j < len; j++) {
            innerArr.push(str[j]);
            if (str[j] === 'O' || str[j] === 'O') {
                oYaxis = i;
                oXaxis = j;
            }
        }
        twoDimensionArr.push(innerArr);
    }

    const score = calculate(oYaxis, oXaxis)


}

function calculate(yLocation, xLocation) {

    let leftScore = 0, rightScore = 0;
    if (canKillLeft(yLocation, xLocation)) {

        const newYLocation = yLocation - 2;
        const newXLocation = xLocation - 2;
        leftScore = 1 + calculate(newYLocation, newXLocation);
    }

    if (canKillRight(yLocation, xLocation)) {

        const newYLocation = yLocation + 2;
        const newXLocation = xLocation - 2;
        rightScore = 1 + calculate(newYLocation, newXLocation);
    }

    if (leftScore > rightScore)
        return leftScore;
    else if (rightScore >= leftScore)
        return rightScore;
    else
        return 0


}


function canKillLeft(yLocation, xLocation) {
    return (twoDimensionArr[yLocation - 1][xLocation - 1] === 'x') &&
        (twoDimensionArr[yLocation - 2][xLocation - 2] === '.');
}

function canKillRight(yLocation, xLocation) {
    return (twoDimensionArr[yLocation - 1][xLocation + 1] === 'x') &&
        (twoDimensionArr[yLocation - 2][xLocation + 2] === '.');
}

