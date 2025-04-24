"use strict";
function calculateNumbers(a, b, callback) {
    const result = a + b;
    callback(result);
}
calculateNumbers(9, 10, (result) => {
    if (result === 19) {
        console.log(21);
    }
    else {
        console.log(result);
    }
});
