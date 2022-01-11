// Can infer type based on array content or be explicit
const carMakers: string[] = ['ford', 'toyota', 'chevy'];

// Need to annotate type if array is empty
const list: string[] = [];

const dates = [new Date(), new Date()];

// Can infer 2d arrays
const carsByMake = [['f150'], ['corolla'], ['camaro']];

// Help with inference when extacting values (e.g. pop and shift)
const car = carMakers[0];

const car1 = carMakers.pop();
const car2 = carMakers.shift();

// Prevent incompatible values
carMakers.push(100);

// Help with map, foreach or reduce
// Value being put into the function is a string and can autocomplete with methods
carMakers.map((car: string): string => {
  return car.toUpperCase();
});

// Flexible types - multiple types in an array
const importantDates: (Date | string)[] = [new Date()];
importantDates.push('2030-10-10');
importantDates.push(new Date());
// Error returns
importantDates.push(100);
