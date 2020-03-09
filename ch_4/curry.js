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

const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs) => xs.filter(f));
const map = curry((f, xs) => xs.map(f));

// match(/r/g, 'hello world');
const hasLetterR = match(/r/g);
hasLetterR('hello world');
hasLetterR('just j and s and t etc');

// console.log(filter(hasLetterR, ['rock and roll', 'smooth jazz']))

const removeStringsWithoutRs = filter(hasLetterR);
// console.log(removeStringsWitheoutRs(['rock and roll', 'smooth jazz']))

const noVowels = replace(/[aeiou]/ig);
const censored = noVowels('*');
// console.log(censored('what the peanut button'));

const getChildren = x => x.childNodes;
const allTheChidren = map(getChildren)

const split = curry((sep, str) => str.split(sep))
const words = split('')
// console.log(words);
// console.log(words('foo'))

// const filterQs = xs => filter(x => x.match(/q/i), xs);
const filterQs = filter(match(/q/i))
// console.log(filterQs(['nice queen', 'dude']))


const reduce = curry((fn, zero, xs) => xs.reduce(fn, zero));
const keepHighest = (x, y) => (x >= y ? x : y);
// const max = xs => reduce((acc, x) => (x >= acc ? x : acc), -Infinity, xs);

const max = reduce(keepHighest, -Infinity)

const high = max([1,4,2,6,5])
console.log(high)






