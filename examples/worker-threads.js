/**
 * Worker Threads Example
 * 
 * This file demonstrates how to use Node.js worker_threads module to offload
 * CPU-intensive tasks from the main thread, keeping the application responsive.
 * 
 * Key Concepts:
 * - Main Thread: The primary execution thread (runs your main application)
 * - Worker Thread: Separate thread that runs CPU-intensive tasks in parallel
 * - Communication: Data exchange between main thread and workers via messages
 * 
 * Why Use Worker Threads?
 * - Node.js is single-threaded (main thread runs event loop)
 * - CPU-intensive tasks block the event loop, making app unresponsive
 * - Worker threads allow parallel processing without blocking main thread
 * 
 * Usage: node examples/worker-threads.js
 */

// Import worker_threads module (built-in Node.js module, no external dependencies)
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

/**
 * CPU-intensive task: Calculate Fibonacci number using recursion
 * 
 * This is intentionally inefficient (O(2^n)) to demonstrate CPU blocking.
 * In a real scenario, you'd optimize this, but for learning purposes,
 * this shows how CPU-intensive tasks can block the event loop.
 * 
 * @param {number} n - The Fibonacci sequence position
 * @returns {number} - The Fibonacci number at position n
 * 
 * Example: calculateFibonacci(10) returns 55
 */
const calculateFibonacci = (n) => {
  // Base cases: Fibonacci(0) = 0, Fibonacci(1) = 1
  if (n < 2) return n;
  
  // Recursive case: F(n) = F(n-1) + F(n-2)
  // This creates exponential time complexity, making it CPU-intensive
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
};

/**
 * CPU-intensive task: Find all prime numbers up to a given limit
 * 
 * Uses trial division method - checks each number from 2 to limit
 * to see if it's prime. This involves nested loops and is CPU-intensive.
 * 
 * @param {number} limit - The upper limit to search for primes
 * @returns {number[]} - Array of all prime numbers up to limit
 * 
 * Example: findPrimes(10) returns [2, 3, 5, 7]
 */
const findPrimes = (limit) => {
  const primes = [];
  
  // Check each number from 2 to limit
  for (let num = 2; num <= limit; num++) {
    let isPrime = true;
    
    // Check if num is divisible by any number from 2 to sqrt(num)
    // If divisible, it's not prime
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break; // No need to check further
      }
    }
    
    // If no divisors found, it's prime
    if (isPrime) {
      primes.push(num);
    }
  }
  
  return primes;
};

// ============================================================================
// MAIN THREAD LOGIC
// ============================================================================
// isMainThread: Boolean that's true when code runs in the main thread
// When you run this file, isMainThread will be true
// When Worker spawns a worker thread with this file, isMainThread will be false

if (isMainThread) {
  console.log('===========================================');
  console.log('  WORKER THREADS EXAMPLE');
  console.log('===========================================\n');
  
  console.log('📊 Main Thread: Starting CPU-intensive tasks...\n');
  
  // ========================================================================
  // WORKER 1: Calculate Fibonacci Number
  // ========================================================================
  // Worker constructor creates a new worker thread
  // __filename: The current file (worker will execute same file)
  // workerData: Data to pass to worker thread (must be serializable)
  
  const worker1 = new Worker(__filename, {
    workerData: {
      task: 'fibonacci',    // Task identifier for worker to know what to do
      input: 40             // Input parameter (Fibonacci(40) is CPU-intensive)
    }
  });
  
  // Event: 'message' - Fired when worker sends data back to main thread
  // The worker calls parentPort.postMessage() to trigger this event
  worker1.on('message', (result) => {
    console.log('✅ Worker 1 Result:', result);
    console.log(`   Fibonacci(40) = ${result.value}`);
    console.log(`   Time taken: ${result.duration}ms\n`);
  });
  
  // Event: 'error' - Fired when worker encounters an error
  // This handles any errors that occur in the worker thread
  worker1.on('error', (error) => {
    console.error('❌ Worker 1 Error:', error);
  });
  
  // Event: 'exit' - Fired when worker thread exits
  // code: Exit code (0 = success, non-zero = error)
  worker1.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker 1 stopped with exit code ${code}`);
    }
  });
  
  // ========================================================================
  // WORKER 2: Find Prime Numbers
  // ========================================================================
  // This demonstrates that you can spawn multiple workers simultaneously
  // Each worker runs in parallel, processing independently
  
  const worker2 = new Worker(__filename, {
    workerData: {
      task: 'primes',       // Different task for this worker
      input: 100000         // Find primes up to 100,000 (CPU-intensive)
    }
  });
  
  // Handle messages from worker 2
  worker2.on('message', (result) => {
    console.log('✅ Worker 2 Result:', result);
    console.log(`   Found ${result.value.length} prime numbers`);
    console.log(`   Time taken: ${result.duration}ms\n`);
  });
  
  // Handle errors from worker 2
  worker2.on('error', (error) => {
    console.error('❌ Worker 2 Error:', error);
  });
  
  // Handle exit from worker 2
  worker2.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker 2 stopped with exit code ${code}`);
    }
  });
  
  // ========================================================================
  // MAIN THREAD CONTINUES WORKING (NON-BLOCKING)
  // ========================================================================
  // This demonstrates the key benefit: main thread stays responsive
  // While workers process CPU-intensive tasks, main thread can do other work
  // Without worker threads, this counter would pause during CPU-intensive operations
  
  console.log('💡 Main thread continues to work while workers process...\n');
  
  let counter = 0;
  const interval = setInterval(() => {
    counter++;
    console.log(`   Main thread counter: ${counter}`);
    
    // Stop after 5 iterations
    if (counter >= 5) {
      clearInterval(interval);
      console.log('\n✅ Main thread completed its work\n');
    }
  }, 500);
  
  // ========================================================================
  // KEY OBSERVATIONS:
  // ========================================================================
  // 1. Main thread counter increments smoothly (non-blocking)
  // 2. Workers process in parallel (you'll see overlapping outputs)
  // 3. Results arrive asynchronously when workers complete
  // 4. Main thread remains responsive throughout
  
} else {
  // ============================================================================
  // WORKER THREAD LOGIC
  // ============================================================================
  // This code runs ONLY in worker threads (when isMainThread is false)
  // When Worker(__filename) is called, Node.js spawns a new thread and
  // executes this file, but isMainThread will be false
  
  // workerData: Data passed from main thread via Worker constructor
  // Destructure to get task type and input value
  const { task, input } = workerData;
  
  // Record start time to measure processing duration
  const startTime = Date.now();
  
  let result;
  
  // Determine which task to perform based on workerData.task
  if (task === 'fibonacci') {
    console.log(`   Worker: Calculating Fibonacci(${input})...`);
    // Perform CPU-intensive calculation
    result = calculateFibonacci(input);
    
  } else if (task === 'primes') {
    console.log(`   Worker: Finding primes up to ${input}...`);
    // Perform CPU-intensive calculation
    result = findPrimes(input);
  }
  
  // Calculate how long the task took
  const duration = Date.now() - startTime;
  
  // ========================================================================
  // SEND RESULT BACK TO MAIN THREAD
  // ========================================================================
  // parentPort: Communication channel to main thread
  // postMessage(): Sends data to main thread (triggers 'message' event)
  // Data must be serializable (JSON-serializable)
  
  parentPort.postMessage({
    task: task,           // Echo back the task type
    value: result,        // The computed result
    duration: duration     // How long it took (in milliseconds)
  });
  
  // Worker thread will exit automatically after this code completes
  // Or you can explicitly exit with: process.exit(0)
}

// ============================================================================
// SUMMARY OF WORKER_THREADS API:
// ============================================================================
// 
// Main Thread Side:
// - new Worker(filename, options): Creates a new worker thread
// - worker.on('message', callback): Listens for messages from worker
// - worker.on('error', callback): Handles worker errors
// - worker.on('exit', callback): Handles worker exit
// - worker.postMessage(data): Sends data to worker
// - isMainThread: Boolean, true in main thread
//
// Worker Thread Side:
// - workerData: Data received from main thread
// - parentPort.postMessage(data): Sends data to main thread
// - parentPort.on('message', callback): Listens for messages from main thread
// - isMainThread: Boolean, false in worker thread
//
// Benefits:
// - Keeps main thread responsive during CPU-intensive tasks
// - Allows parallel processing on multi-core CPUs
// - Better performance for compute-heavy operations
//
// Limitations:
// - Workers have separate memory (no shared state)
// - Communication via message passing (serialization overhead)
// - Not suitable for I/O operations (use regular async/await for I/O)
// ============================================================================
