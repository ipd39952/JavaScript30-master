const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log("Hello");
// Interpolated
console.log("Hello, my name is %s", 'Ivo')
// Styled
console.log('%cTesting the styling on console.log messages', 'font-size: 20px; background:red;');

// warning!
console.warn("OH NO");
// Error :|
console.error("dead");
// Info
console.info('fun fact');
// Testing
console.assert(1 === 2, "No, that's wrong");
// clearing

// Viewing DOM Elements

// Grouping together

// counting

// timing
