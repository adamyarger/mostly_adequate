const compose = (f, g) => x => f(g(x))

const toUpperCase = x => x.toUpperCase();
const exclaim = x => x + '!';
const shout = compose(toUpperCase, exclaim)

console.log(shout('send in the clowns'))