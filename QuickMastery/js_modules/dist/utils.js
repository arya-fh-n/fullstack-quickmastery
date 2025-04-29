"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namedExportFunction = namedExportFunction;
function namedExportFunction() {
    console.log("This is a named export function");
}
const defaultExportFunction = {
    namedFunction: namedExportFunction,
    anotherFunction: () => console.log("This is another function"),
    yetAnotherFunction: () => console.log("This is yet another function"),
};
exports.default = defaultExportFunction;
