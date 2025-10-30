const axios = require('axios');

// Base URL for the imaginary API
const BASE_URL = 'https://www.jsonexperiment.com';

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Promise Chaining Example - 3 Levels using .then()
 * This demonstrates promise chaining pattern with axios
 * Each promise depends on the previous promise's response
 * Better than callbacks, but async/await is still cleaner
 */
const promiseChainingExample = () => {
  console.log('🚀 Starting Promise Chaining Example (3 Levels)...\n');
  console.log('📝 Using: .then() chaining pattern\n');
  
  const startTime = Date.now();
  
  // ========== LEVEL 1: First Request - Get user ==========
  console.log('========== PROMISE CHAINING LEVEL 1 ==========');
  console.log('Request: GET /api/users');
  console.log('============================================\n');
  
  axiosInstance.get('/api/users', {
    params: { id: 1 },
    headers: { 'X-API-Key': 'key-1' }
  })
    .then((response1) => {
      // Log Level 1 response
      console.log('✅ Level 1 Response Received');
      console.log(`Status: ${response1.status}`);
      console.log('Headers:', JSON.stringify(response1.headers, null, 2));
      console.log('Data:', JSON.stringify(response1.data, null, 2));
      console.log('\n');
      
      // Extract user ID from response (simulating data dependency)
      const userId = response1.data?.id || 1;
      
      // ========== LEVEL 2: Second Request - Chained after Level 1 ==========
      console.log('========== PROMISE CHAINING LEVEL 2 ==========');
      console.log(`Request: GET /api/posts?userId=${userId}`);
      console.log('(Chained after Level 1 promise)');
      console.log('============================================\n');
      
      // Return next promise to chain
      return axiosInstance.get('/api/posts', {
        params: { userId: userId },
        headers: { 'X-API-Key': 'key-2' }
      });
    })
    .then((response2) => {
      // Log Level 2 response
      console.log('✅ Level 2 Response Received');
      console.log(`Status: ${response2.status}`);
      console.log('Headers:', JSON.stringify(response2.headers, null, 2));
      console.log('Data:', JSON.stringify(response2.data, null, 2));
      console.log('\n');
      
      // Extract post ID from response (simulating data dependency)
      const postId = response2.data?.[0]?.id || 1;
      
      // ========== LEVEL 3: Third Request - Chained after Level 2 ==========
      console.log('========== PROMISE CHAINING LEVEL 3 ==========');
      console.log(`Request: POST /api/comments`);
      console.log(`(Chained after Level 2 promise - postId: ${postId})`);
      console.log('============================================\n');
      
      // Return next promise to chain
      return axiosInstance.post('/api/comments',
        { postId: postId, text: 'Great post!' },
        {
          params: { notify: true },
          headers: { 'X-API-Key': 'key-3' }
        }
      );
    })
    .then((response3) => {
      // Log Level 3 response
      console.log('✅ Level 3 Response Received');
      console.log(`Status: ${response3.status}`);
      console.log('Headers:', JSON.stringify(response3.headers, null, 2));
      console.log('Data:', JSON.stringify(response3.data, null, 2));
      console.log('\n');
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log('========== PROMISE CHAINING COMPLETE ==========');
      console.log(`All 3 chained promises completed in ${duration}ms`);
      console.log('Pattern: .then() -> .then() -> .then()');
      console.log('Better than callbacks, but async/await is cleaner!');
      console.log('=============================================\n');
      
      console.log('✅ Promise Chaining Example Completed!');
      console.log('📝 Advantages over callbacks:');
      console.log('   - Flatter structure (no deep nesting)');
      console.log('   - Better error handling with .catch()');
      console.log('   - Each .then() returns a new promise');
      console.log('💡 Still, async/await is more readable!\n');
      
      return {
        user: response3.data,
        duration
      };
    })
    .catch((error) => {
      // Single error handler for entire chain
      console.error('❌ Promise Chaining Failed!');
      
      console.error('\n========== PROMISE CHAINING ERROR ==========');
      
      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        console.error(`Status: ${error.response.status} ${error.response.statusText}`);
        console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
        console.error('Error Headers:', JSON.stringify(error.response.headers, null, 2));
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received from server');
        console.error('Request:', error.request);
      } else {
        // Error in setting up the request
        console.error('Error Message:', error.message);
      }
      
      console.error('===========================================\n');
      console.error('💡 Note: Single .catch() handles errors from any level');
    });
};

/**
 * Promise Chaining with Data Passing Example
 * Shows how to pass data through the chain
 */
const promiseChainingWithData = () => {
  console.log('🚀 Starting Promise Chaining with Data Passing...\n');
  
  const startTime = Date.now();
  
  axiosInstance.get('/api/users', {
    params: { id: 1 },
    headers: { 'X-API-Key': 'key-1' }
  })
    .then((response1) => {
      console.log('✅ Got user data');
      const userData = response1.data;
      
      // Return both the response and userData for next chain
      return {
        userResponse: response1,
        userData: userData,
        userId: userData?.id || 1
      };
    })
    .then(({ userData, userId }) => {
      // Access data from previous promise
      console.log(`✅ Fetching posts for user: ${userId}`);
      
      return axiosInstance.get('/api/posts', {
        params: { userId: userId },
        headers: { 'X-API-Key': 'key-2' }
      }).then((response2) => {
        // Return combined data
        return {
          userData: userData,
          postsData: response2.data,
          postId: response2.data?.[0]?.id || 1
        };
      });
    })
    .then(({ userData, postsData, postId }) => {
      // Access all previous data
      console.log(`✅ Creating comment on post: ${postId}`);
      
      return axiosInstance.post('/api/comments',
        { postId: postId, text: 'Great post!' },
        {
          params: { notify: true },
          headers: { 'X-API-Key': 'key-3' }
        }
      ).then((response3) => {
        return {
          user: userData,
          posts: postsData,
          comment: response3.data
        };
      });
    })
    .then((result) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log('\n✅ All promises completed!');
      console.log('Result:', JSON.stringify(result, null, 2));
      console.log(`Duration: ${duration}ms\n`);
      
      return result;
    })
    .catch((error) => {
      console.error('❌ Promise chain failed:', error.message);
    });
};

/**
 * Promise Chaining with Error Handling at Each Level
 * Shows how to handle errors at specific points in the chain
 */
const promiseChainingWithSelectiveErrors = () => {
  console.log('🚀 Starting Promise Chaining with Selective Error Handling...\n');
  
  axiosInstance.get('/api/users', {
    params: { id: 1 },
    headers: { 'X-API-Key': 'key-1' }
  })
    .then((response1) => {
      console.log('✅ Level 1: Got user');
      return response1.data?.id || 1;
    })
    .catch((error) => {
      // Handle Level 1 errors specifically
      console.error('❌ Level 1 Error:', error.message);
      // Return default value to continue chain
      return 1;
    })
    .then((userId) => {
      console.log(`✅ Level 2: Fetching posts for user ${userId}`);
      return axiosInstance.get('/api/posts', {
        params: { userId: userId },
        headers: { 'X-API-Key': 'key-2' }
      });
    })
    .then((response2) => {
      console.log('✅ Level 2: Got posts');
      return response2.data?.[0]?.id || 1;
    })
    .catch((error) => {
      // Handle Level 2 errors specifically
      console.error('❌ Level 2 Error:', error.message);
      // Return default value to continue chain
      return 1;
    })
    .then((postId) => {
      console.log(`✅ Level 3: Creating comment on post ${postId}`);
      return axiosInstance.post('/api/comments',
        { postId: postId, text: 'Great post!' },
        {
          params: { notify: true },
          headers: { 'X-API-Key': 'key-3' }
        }
      );
    })
    .then((response3) => {
      console.log('✅ Level 3: Comment created');
      console.log('Final result:', JSON.stringify(response3.data, null, 2));
    })
    .catch((error) => {
      // Final catch for any unhandled errors
      console.error('❌ Final Error:', error.message);
    });
};

// Run examples if this file is executed directly
if (require.main === module) {
  console.log('===========================================');
  console.log('  PROMISE CHAINING EXAMPLES');
  console.log('  Using: axios library');
  console.log('  API: www.jsonexperiment.com');
  console.log('===========================================\n');
  
  // Run basic promise chaining example
  promiseChainingExample();
  
  // Wait a bit before next example
  setTimeout(() => {
    console.log('\n--- Example 2: Data Passing ---\n');
    promiseChainingWithData();
  }, 3000);
  
  // Wait a bit before next example
  setTimeout(() => {
    console.log('\n--- Example 3: Selective Error Handling ---\n');
    promiseChainingWithSelectiveErrors();
  }, 6000);
  
  // Final message
  setTimeout(() => {
    console.log('\n===========================================');
    console.log('  All examples completed');
    console.log('  (Errors are expected - API is imaginary)');
    console.log('===========================================');
  }, 10000);
}

module.exports = {
  promiseChainingExample,
  promiseChainingWithData,
  promiseChainingWithSelectiveErrors,
  axiosInstance
};

