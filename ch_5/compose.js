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
console.log( initials('hunter stockton thompson') );







