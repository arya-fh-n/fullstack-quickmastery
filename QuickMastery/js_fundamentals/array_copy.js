let students = [
    {
        name: "John",
        score: 80
    },
    {
        name: "Jane",
        score: 90
    },
    {
        name: "Bob",
        score: 85
    }
]

let shallowCopy = students.slice();
let deepCopy = JSON.parse(JSON.stringify(students));

let infinite = -Infinity;

shallowCopy[0].score = 95;

console.log(shallowCopy);
console.log(deepCopy);
