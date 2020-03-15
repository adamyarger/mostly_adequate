function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    // console.log('called', $curry, fn)

    // this is where currying occurs, since where binding the single 
    // param to the curry function and returning it.

    // then next time the function is called it remembers the single param
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
const reduce = curry((fn, zero, xs) => xs.reduce(fn, zero));
const replace = curry((re, rpl, str) => str.replace(re, rpl));

const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const shout = compose(exclaim, toUpperCase);

// console.log(shout('send in the clowns'));

// in functional programming we never use for loops
// why?
// beacause using a for loop means have have to use a mutatable vairable which is not a pure function.
// what we use instead is highorder functions and recrusion

// composing allows use to avoid nesting functions

// how could you use compose for the document utils file

const head = x => x[0];
const reverse = reduce((acc, x) => [x].concat(acc), []);
const last = compose(head, reverse);
// console.log( last(['jumpkick', 'roundhouse', 'uppercut']) ); 

const arg = ['jumpkick', 'roundhouse', 'uppercut'];
const lastUpper = compose(toUpperCase, head, reverse);
// const loudLastUpper = compose(exclaim, toUpperCase, head, reverse);

const loudLastUpper = compose(exclaim, toUpperCase, last)
// console.log(loudLastUpper(arg))


// not pointfree because we mention the data: word
const snakeCase_ = word => word.toLowerCase().replace(/\s+/ig, '_');
// console.log( snakeCase_('Cool Man') )

// pointfree
const toLowerCase = x => x.toLowerCase()
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
// console.log( snakeCase('Cool My Dude') )

// not pointfree because we mention the data: name
// const initials = name => name.split(' ').map(compose(toUpperCase, head)).join('. ');
// const split = curry((fn, f) => (spliter, item) => item.split(spliter))
const split = curry((sep, str) => str.split(sep));
const map = curry((fn, f) => f.map(fn));
const intercalate = curry((str, xs) => xs.join(str));

// point free
// this reads from left to right
// * split the string into an array
// * map the array and grab the first letter from each word and capitilize it
// * join the array together
const initials = compose(intercalate('. '), map(compose(toUpperCase, head)), split(' '));
// console.log( initials('hunter stockton thompson') );

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});


// const last = xs => xs[xs.length - 1];
const prop = curry((p, obj) => obj[p]);
const cars = [
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: 'Ford Fiesta',
    horsepower: 200,
    dollar_value: 10000,
    in_stock: true,
  }
];
// const isLastInStock = (cars) => {
//   const lastCar = last(cars);
//   return prop('in_stock', lastCar);
// };

const isLastInStock = compose(prop('in_stock'), last);

// console.log(isLastInStock(cars))

const add = curry((a, b) => a + b);
const average = xs => reduce(add, 0, xs) / xs.length;
// const averageDollarValue = (cars) => {
//   const dollarValues = map(c => c.dollar_value, cars);
//   return average(dollarValues);
// };

const averageDollarValue = compose(average, map(prop('dollar_value')));

// console.log(averageDollarValue(cars))

const sortBy = curry((fn, xs) => xs.sort((a, b) => {
  if (fn(a) === fn(b)) {
    return 0;
  }

  return fn(a) > fn(b) ? 1 : -1;
}));

const concat = curry((a, b) => a.concat(b));
const flip = curry((fn, a, b) => fn(b, a));
const append = flip(concat);
// const fastestCar = (cars) => {
//   const sorted = sortBy(car => car.horsepower, cars);
//   const fastest = last(sorted);
//   return concat(fastest.name, ' is the fastest');
// };

const fastestCar = compose(
  append(' is the fastest'),
  prop('name'),
  last,
  sortBy(prop('horsepower'))
);

console.log(fastestCar(cars));











