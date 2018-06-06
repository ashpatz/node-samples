'use strict';

var fs = require('fs');
const jsonBatchFile = 'batchOfJsons.txt';


const jsonBatch = fs.readFileSync(jsonBatchFile);
const jsonBatchString = jsonBatch.toString();
console.log(jsonBatchString);

const jsonStringArr = [];
jsonStringArr.push('[');

const replacedString = jsonBatchString.replace(/}{/g, '},{');
console.log(replacedString);
jsonStringArr.push(replacedString);

jsonStringArr.push(']');

const jsonString = jsonStringArr.join('');
console.log(JSON.parse(jsonString));