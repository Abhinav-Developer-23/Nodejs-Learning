const axios = require('axios');

/**
 * Custom Promise Example - Creating your own promises
 * Using setTimeout to simulate async operations
 */

// Example 1: Simple promise with setTimeout
const createCustomPromise = (delay, shouldSucceed = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(`Success! Completed after ${delay}ms`);
      } else {
        reject(new Error(`Failed after ${delay}ms`));
      }
    }, delay);
  });
};

// Example 2: Promise that wraps axios request
const fetchUserWithDelay = (userId, delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get('https://www.jsonexperiment.com/api/users', {
        params: { id: userId },
        headers: { 'X-API-Key': 'key-1' }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }, delay);
  });
};

// Example 3: Promise with multiple setTimeout operations
const sequentialOperations = () => {
  return new Promise((resolve, reject) => {
    console.log('Starting operation 1...');
    setTimeout(() => {
      console.log('✅ Operation 1 completed');
      
      console.log('Starting operation 2...');
      setTimeout(() => {
        console.log('✅ Operation 2 completed');
        
        console.log('Starting operation 3...');
        setTimeout(() => {
          console.log('✅ Operation 3 completed');
          resolve('All operations completed!');
        }, 1000);
      }, 1000);
    }, 1000);
  });
};

// Run examples
if (require.main === module) {
  console.log('===========================================');
  console.log('  CUSTOM PROMISE EXAMPLES');
  console.log('===========================================\n');
  
  // Example 1: Simple promise
  console.log('Example 1: Simple Promise');
  createCustomPromise(2000, true)
    .then((result) => {
      console.log('Result:', result);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
  
  // Example 2: Promise with error
  setTimeout(() => {
    console.log('\nExample 2: Promise with Error');
    createCustomPromise(1000, false)
      .then((result) => {
        console.log('Result:', result);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }, 2500);
  
  // Example 3: Wrapped axios request
  setTimeout(() => {
    console.log('\nExample 3: Wrapped Axios Request');
    fetchUserWithDelay(1, 500)
      .then((data) => {
        console.log('User Data:', JSON.stringify(data, null, 2));
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }, 4000);
  
  // Example 4: Sequential operations
  setTimeout(() => {
    console.log('\nExample 4: Sequential Operations');
    sequentialOperations()
      .then((result) => {
        console.log('Final Result:', result);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }, 6000);
  
  setTimeout(() => {
    console.log('\n===========================================');
    console.log('  Examples completed');
    console.log('===========================================');
  }, 12000);
}

module.exports = {
  createCustomPromise,
  fetchUserWithDelay,
  sequentialOperations
};

