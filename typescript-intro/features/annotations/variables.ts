// Typescript infers type if declaration and initialization is on the same line

// Type annotation to say apples is a number
let apples: number = 5;
// No error
apples = 10;
// Error generated
apples = '1231411';

let speed: string = 'fast';
speed = 'slow';
// Error
speed = 5;

let nothingMuch: null = null;
let nothing: undefined = undefined;

// Built in objects
let now: Date = new Date();

// Array of strings
let colors: string[] = ['red', 'green', 'blue'];
// Error
colors.push(5);
// No error
colors.unshift('pink');

// Array of numbers
let myNumbers: number[] = [1, 2, 3];

// Array of booleans
let truths: boolean[] = [true, false, true];

// Classes
class Car {}

let car: Car = new Car();

// Object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20,
};

// Functions
// Expect number input and output of void
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

// When to use annotations
// 1) Function that returns the 'any' type
const json = '{"x": 10, "y": 20}';
// Coordinates returns as any (check with hover).  JSON.parse returns any
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates);

// 2) When we declare a variable on one line and initialize it later
let words = ['red', 'green', 'blue'];
// foundWord is any type unless specified
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === 'green') {
    foundWord = true;
  }
}

// 3) Variable whose type cannot be inferred correctly
let numbers = [-10, -1, 12];
// Type can be boolean or number
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
