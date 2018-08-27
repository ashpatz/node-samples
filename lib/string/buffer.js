'use strict';

const a = Buffer.from(
    'eyJjbGllbnRJZCI6IjMwMTExMzY3NjQiLCJpbnN0YW5jZUlkIjoiQkUxMTE1ODc4NSIsImNvcnJlbGF0aW9uSWQiOiJlNmRlZDNjMS0yYWM4LTQ2ZGItODVmOS1lMzE3ZTM2ZmZlYjQifQ==',
    'base64');

console.log(a.toString('utf8'));
