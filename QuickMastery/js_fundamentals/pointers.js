let primitiveA = "A";
let primitiveB = primitiveA;
primitiveB = 2;
console.log(primitiveA);

let objectA = { value: "Apel" };
let objectB = objectA;
objectB.value = 3.14;
console.log(objectA.value);