// Type of value the function will return is number
// Arrow functions
const add = (a: number, b: number): number => {
  return a + b;
};

const subtract = (a: number, b: number): number => {
  return a - b;
};

// Named function
function divide(a: number, b: number): number {
  return a / b;
}

// Anonymous function
const multiply = function (a: number, b: number): number {
  return a * b;
};

// Not return anything (void/null/undefined)
const logger = (message: string): void => {
  console.log(message);
};
// Never going to reach the end of the function, an error will be thrown
const throwError = (message: string): never => {
  throw new Error(message);
};

// Can destructure data in the function
const todaysWeather = {
  date: new Date(),
  weather: 'sunny',
};

const logWeather = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};

logWeather(todaysWeather);
