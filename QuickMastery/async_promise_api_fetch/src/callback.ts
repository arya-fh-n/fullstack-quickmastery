type Callback = (result: number) => void;

function calculateNumbers(a: number, b: number, callback: Callback) {
  const result = a + b;
  callback(result);
}

calculateNumbers(9, 10, (result) => {
  if (result === 19) {
    console.log(21);
  } else {
    console.log(result);
  }
});
