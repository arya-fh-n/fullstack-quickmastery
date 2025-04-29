import defaultExportFunction, { namedExportFunction } from "./utils";

defaultExportFunction.namedFunction(); // Output: This is the default export function
namedExportFunction(); // Output: This is a named export function

// Example of object destructuring
const person = {
  name: "Alice",
  age: 30,
  city: "Wonderland",
};

const { name, age, city } = person;
console.log(name); // Output: Alice
console.log(age); // Output: 30
console.log(city); // Output: Wonderland

// Example of array destructuring
const colors = ["red", "green", "blue"];
const [firstColor, secondColor, thirdColor] = colors;
console.log(firstColor); // Output: red
console.log(secondColor); // Output: green
console.log(thirdColor); // Output: blue
