// Basic object
const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
};

// Specifies a tuple type
type Drink = [string, boolean, number];
// Annotation turns it into a tuple with a consistent order of elements
const pepsi: Drink = ['brown', true, 40];
// Returns an error
pepsi[0] = 40;

const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];

// Tuples aren't so useful here as we don't know what the numbers mean
const carSpecs: [number, number] = [400, 3343];
// Much clearer than tuples
const carStats = {
  horsepower: 400,
  weight: 3343,
};
