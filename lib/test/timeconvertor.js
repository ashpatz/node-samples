const createReadable = (timeInSeconds) => {
    const minutes = timeInSeconds/60;
    const hours = Math.floor(minutes/60);
    const remainingMinutes = Math.floor(minutes - (hours * 60));
    const remainingSeconds = timeInSeconds - ((hours*60*60) + (remainingMinutes  * 60));

    return `${hours}h${remainingMinutes}m${remainingSeconds}s`;
};

console.log(createReadable(7500));
console.log(createReadable(7501));
console.log(createReadable(83643));