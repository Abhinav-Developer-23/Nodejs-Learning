const request = require('request');

// Base URL for the imaginary API
const BASE_URL = 'https://www.jsonexperiment.com';

/**
 * TRUE CALLBACK HELL Example - 3 Levels of Nested Callbacks
 * Using the 'request' library which natively uses callbacks
 * This demonstrates the actual callback hell pattern
 */
const callbackHellExample = () => {
  console.log('🚀 Starting TRUE Callback Hell Example (3 Levels)...\n');
  console.log('⚠️  Warning: This is REAL callback hell with request library!\n');
  
  const startTime = Date.now();
  
  // ========== LEVEL 1: First Request - Get user ==========
  console.log('========== CALLBACK HELL LEVEL 1 ==========');
  console.log('Request: GET /api/users');
  console.log('==========================================\n');
  
  request.get({
    url: `${BASE_URL}/api/users`,
    qs: { id: 1 }, // Query parameters
    headers: {
      'X-API-Key': 'key-1',
      'Content-Type': 'application/json'
    },
    json: true // Automatically parse JSON response
  }, (error1, response1, body1) => {
    // Level 1 Callback - Error handling
    if (error1) {
      console.error('\n❌ CALLBACK HELL LEVEL 1 FAILED!');
      console.error('Error:', error1.message);
      console.error('===================================\n');
      return;
    }
    
    if (response1.statusCode !== 200) {
      console.error('\n❌ CALLBACK HELL LEVEL 1 FAILED!');
      console.error(`Status: ${response1.statusCode}`);
      console.error('Error Data:', JSON.stringify(body1, null, 2));
      console.error('===================================\n');
      return;
    }
    
    // Log Level 1 response
    console.log('✅ Level 1 Response Received');
    console.log(`Status: ${response1.statusCode}`);
    console.log('Headers:', JSON.stringify(response1.headers, null, 2));
    console.log('Data:', JSON.stringify(body1, null, 2));
    console.log('\n');
    
    // Extract user ID from response (simulating data dependency)
    const userId = body1?.id || 1;
    
    // ========== LEVEL 2: Second Request - Nested inside Level 1 callback ==========
    console.log('========== CALLBACK HELL LEVEL 2 ==========');
    console.log(`Request: GET /api/posts?userId=${userId}`);
    console.log('(Nested inside Level 1 callback)');
    console.log('==========================================\n');
    
    request.get({
      url: `${BASE_URL}/api/posts`,
      qs: { userId: userId }, // Query parameters
      headers: {
        'X-API-Key': 'key-2',
        'Content-Type': 'application/json'
      },
      json: true
    }, (error2, response2, body2) => {
      // Level 2 Callback - Nested inside Level 1 - Error handling
      if (error2) {
        console.error('\n❌ CALLBACK HELL LEVEL 2 FAILED!');
        console.error('Error:', error2.message);
        console.error('===================================\n');
        return;
      }
      
      if (response2.statusCode !== 200) {
        console.error('\n❌ CALLBACK HELL LEVEL 2 FAILED!');
        console.error(`Status: ${response2.statusCode}`);
        console.error('Error Data:', JSON.stringify(body2, null, 2));
        console.error('===================================\n');
        return;
      }
      
      // Log Level 2 response
      console.log('✅ Level 2 Response Received');
      console.log(`Status: ${response2.statusCode}`);
      console.log('Headers:', JSON.stringify(response2.headers, null, 2));
      console.log('Data:', JSON.stringify(body2, null, 2));
      console.log('\n');
      
      // Extract post ID from response (simulating data dependency)
      const postId = body2?.[0]?.id || 1;
      
      // ========== LEVEL 3: Third Request - Nested inside Level 2 callback ==========
      console.log('========== CALLBACK HELL LEVEL 3 ==========');
      console.log(`Request: POST /api/comments`);
      console.log(`(Nested inside Level 2 callback - postId: ${postId})`);
      console.log('==========================================\n');
      
      request.post({
        url: `${BASE_URL}/api/comments`,
        qs: { notify: true }, // Query parameters
        headers: {
          'X-API-Key': 'key-3',
          'Content-Type': 'application/json'
        },
        json: {
          postId: postId,
          text: 'Great post!'
        } // JSON body
      }, (error3, response3, body3) => {
        // Level 3 Callback - Nested inside Level 2 - Error handling
        if (error3) {
          console.error('\n❌ CALLBACK HELL LEVEL 3 FAILED!');
          console.error('Error:', error3.message);
          console.error('===================================\n');
          return;
        }
        
        if (response3.statusCode !== 200 && response3.statusCode !== 201) {
          console.error('\n❌ CALLBACK HELL LEVEL 3 FAILED!');
          console.error(`Status: ${response3.statusCode}`);
          console.error('Error Data:', JSON.stringify(body3, null, 2));
          console.error('===================================\n');
          return;
        }
        
        // Log Level 3 response
        console.log('✅ Level 3 Response Received');
        console.log(`Status: ${response3.statusCode}`);
        console.log('Headers:', JSON.stringify(response3.headers, null, 2));
        console.log('Data:', JSON.stringify(body3, null, 2));
        console.log('\n');
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        console.log('========== CALLBACK HELL COMPLETE ==========');
        console.log(`All 3 nested levels completed in ${duration}ms`);
        console.log('Pattern: Callback -> Callback -> Callback');
        console.log('This is why async/await is preferred!');
        console.log('===========================================\n');
        
        console.log('✅ Callback Hell Example Completed!');
        console.log('📝 Notice how deeply nested this becomes...');
        console.log('💡 This is TRUE callback hell with request library');
        console.log('🎯 Each callback function is nested inside the previous one');
        console.log('🔴 See the pyramid of doom? This gets worse with more levels!\n');
        
        return {
          user: body1,
          posts: body2,
          comment: body3,
          duration
        };
      });
    });
  });
};

// Run the example if this file is executed directly
if (require.main === module) {
  console.log('===========================================');
  console.log('  TRUE CALLBACK HELL EXAMPLE');
  console.log('  Using: request library');
  console.log('  API: www.jsonexperiment.com');
  console.log('===========================================\n');
  
  callbackHellExample();
  
  // Wait a bit to see the async output
  setTimeout(() => {
    console.log('\n===========================================');
    console.log('  Example execution completed');
    console.log('  (Errors are expected - API is imaginary)');
    console.log('===========================================');
  }, 5000);
}

module.exports = {
  callbackHellExample
};
