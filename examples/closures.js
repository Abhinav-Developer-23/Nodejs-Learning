/**
 * Closures in JavaScript
 * 
 * A closure is a function that has access to variables in its outer (enclosing)
 * lexical scope, even after the outer function has returned.
 * 
 * Key Concepts:
 * - Inner functions have access to outer function's variables
 * - Variables persist even after outer function completes
 * - Each closure has its own copy of variables
 * 
 * Usage: node examples/closures.js
 */

// ============================================================================
// 1. BASIC CLOSURE EXAMPLE
// ============================================================================

/**
 * Outer function creates a variable
 * Inner function (closure) accesses that variable
 */
function outerFunction(outerVar) {
  // This variable is in the outer function's scope
  
  /**
   * Inner function - This is a CLOSURE
   * It "closes over" (captures) the outerVar variable
   */
  function innerFunction(innerVar) {
    // Inner function can access:
    // 1. Its own parameters (innerVar)
    // 2. Outer function's variables (outerVar)
    // 3. Global variables
    console.log(`Outer variable: ${outerVar}`);
    console.log(`Inner variable: ${innerVar}`);
  }
  
  // Return the inner function
  // Even though outerFunction completes, innerFunction still
  // has access to outerVar
  return innerFunction;
}

// ============================================================================
// 2. CLOSURE WITH PRIVATE VARIABLES (DATA ENCAPSULATION)
// ============================================================================

/**
 * Closure allows creating private variables
 * Variables are not accessible from outside, only through returned functions
 */
function createCounter() {
  // Private variable - not accessible from outside
  let count = 0;
  
  // Return an object with methods that access the private variable
  return {
    // These methods form closures over 'count'
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

// ============================================================================
// 3. CLOSURE IN LOOPS (COMMON PITFALL)
// ============================================================================

/**
 * Without closure fix - all functions share same variable
 * All will print the final value after loop completes
 */
function createFunctionsWithoutClosure() {
  const functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      console.log('Without closure:', i); // Will print 3, 3, 3
    });
  }
  
  return functions;
}

/**
 * With closure fix - each function gets its own copy
 * Each will print its own index value
 */
function createFunctionsWithClosure() {
  const functions = [];
  
  for (var i = 0; i < 3; i++) {
    // IIFE (Immediately Invoked Function Expression) creates closure
    // Each iteration gets its own scope with its own 'i' value
    functions.push((function(index) {
      return function() {
        console.log('With closure:', index); // Will print 0, 1, 2
      };
    })(i)); // Pass 'i' as parameter
  }
  
  return functions;
}

/**
 * Modern solution using let (block scope)
 * let creates a new binding for each iteration
 */
function createFunctionsWithLet() {
  const functions = [];
  
  for (let i = 0; i < 3; i++) {
    // 'let' creates block scope, so each iteration has its own 'i'
    functions.push(function() {
      console.log('With let:', i); // Will print 0, 1, 2
    });
  }
  
  return functions;
}

// ============================================================================
// 4. CLOSURE WITH SETTIMEOUT
// ============================================================================

/**
 * Closure helps preserve variable values in async operations
 */
function delayedGreeting(name) {
  // This variable is captured by the closure
  const greeting = `Hello, ${name}!`;
  
  setTimeout(function() {
    // Closure allows access to 'greeting' even after delayedGreeting completes
    console.log(greeting);
  }, 1000);
}

// ============================================================================
// 5. MEMOIZATION WITH CLOSURES
// ============================================================================

/**
 * Closure can cache results for performance optimization
 */
function memoize(fn) {
  // Private cache object - only accessible through closure
  const cache = {};
  
  return function(...args) {
    // Create a key from arguments
    const key = JSON.stringify(args);
    
    // Check if result is cached
    if (cache[key]) {
      console.log('Returning cached result');
      return cache[key];
    }
    
    // Calculate and cache result
    console.log('Calculating new result');
    const result = fn.apply(this, args);
    cache[key] = result;
    
    return result;
  };
}

// Example function to memoize
function expensiveCalculation(n) {
  console.log(`Computing for ${n}...`);
  return n * n;
}

// ============================================================================
// 6. MODULE PATTERN WITH CLOSURES
// ============================================================================

/**
 * Closures enable module pattern - private variables and public API
 */
const modulePattern = (function() {
  // Private variables and functions
  let privateVar = 0;
  
  function privateFunction() {
    return 'This is private';
  }
  
  // Public API - returned object
  return {
    // Public methods that access private variables via closure
    getPrivateVar: function() {
      return privateVar;
    },
    setPrivateVar: function(value) {
      privateVar = value;
    },
    publicMethod: function() {
      return privateFunction() + ' but accessible';
    }
  };
})();

// ============================================================================
// DEMONSTRATION
// ============================================================================

if (require.main === module) {
  console.log('===========================================');
  console.log('  CLOSURES IN JAVASCRIPT');
  console.log('===========================================\n');
  
  // Example 1: Basic closure
  console.log('1. Basic Closure:');
  const closure = outerFunction('outer');
  closure('inner');
  console.log('');
  
  // Example 2: Private variables
  setTimeout(() => {
    console.log('2. Closure with Private Variables:');
    const counter1 = createCounter();
    const counter2 = createCounter();
    
    console.log('Counter 1:', counter1.increment()); // 1
    console.log('Counter 1:', counter1.increment()); // 2
    console.log('Counter 2:', counter2.increment()); // 1 (separate instance)
    console.log('Counter 1 count:', counter1.getCount()); // 2
    console.log('Counter 2 count:', counter2.getCount()); // 1
    console.log('');
  }, 500);
  
  // Example 3: Loop closure issue
  setTimeout(() => {
    console.log('3. Closure in Loops:');
    console.log('Without closure fix:');
    const funcs1 = createFunctionsWithoutClosure();
    funcs1.forEach(fn => fn());
    
    console.log('With closure fix:');
    const funcs2 = createFunctionsWithClosure();
    funcs2.forEach(fn => fn());
    
    console.log('With let:');
    const funcs3 = createFunctionsWithLet();
    funcs3.forEach(fn => fn());
    console.log('');
  }, 2000);
  
  // Example 4: Closure with setTimeout
  console.log('4. Closure with setTimeout:');
  delayedGreeting('World');
  console.log('');
  
  // Example 5: Memoization
  setTimeout(() => {
    console.log('5. Memoization with Closure:');
    const memoizedCalc = memoize(expensiveCalculation);
    
    console.log('First call:');
    console.log('Result:', memoizedCalc(5));
    
    console.log('Second call (same input):');
    console.log('Result:', memoizedCalc(5));
    console.log('');
  }, 1500);
  
  // Example 6: Module pattern
  setTimeout(() => {
    console.log('6. Module Pattern:');
    console.log('Private var:', modulePattern.getPrivateVar());
    modulePattern.setPrivateVar(42);
    console.log('After setting:', modulePattern.getPrivateVar());
    console.log('Public method:', modulePattern.publicMethod());
    console.log('');
  }, 6000);
  
  setTimeout(() => {
    console.log('===========================================');
    console.log('  Key Takeaways:');
    console.log('  - Closures preserve outer scope variables');
    console.log('  - Enable data privacy and encapsulation');
    console.log('  - Useful for callbacks and async operations');
    console.log('  - Each closure has its own variable snapshot');
    console.log('===========================================');
  }, 8000);
}

module.exports = {
  outerFunction,
  createCounter,
  memoize,
  modulePattern
};

