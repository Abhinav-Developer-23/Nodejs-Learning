/**
 * Request Logger Middleware
 * Logs request details, response details, and total execution time
 */

const requestLogger = (req, res, next) => {
  // Record start time
  const startTime = Date.now();
  
  // Store original res.json to intercept response
  const originalJson = res.json;
  const originalSend = res.send;
  
  // Capture request details
  const requestDetails = {
    method: req.method,
    url: req.originalUrl || req.url,
    path: req.path,
    query: req.query,
    params: req.params,
    body: req.body,
    headers: {
      'content-type': req.get('content-type'),
      'user-agent': req.get('user-agent'),
      'authorization': req.get('authorization') ? '***' : undefined
    },
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date().toISOString()
  };

  // Log request
  console.log('\n========== REQUEST ==========');
  console.log(`[${requestDetails.timestamp}] ${requestDetails.method} ${requestDetails.url}`);
  console.log('Path:', requestDetails.path);
  
  if (Object.keys(requestDetails.query).length > 0) {
    console.log('Query Parameters:', JSON.stringify(requestDetails.query, null, 2));
  }
  
  if (Object.keys(requestDetails.params).length > 0) {
    console.log('Route Parameters:', JSON.stringify(requestDetails.params, null, 2));
  }
  
  if (Object.keys(requestDetails.body).length > 0) {
    console.log('Request Body:', JSON.stringify(requestDetails.body, null, 2));
  }
  
  console.log('Headers:', JSON.stringify(requestDetails.headers, null, 2));
  console.log('IP Address:', requestDetails.ip);
  console.log('============================\n');

  // Override res.json to capture response body
  res.json = function (body) {
    res.responseBody = body;
    return originalJson.call(this, body);
  };

  // Override res.send to capture response body (for non-JSON responses)
  res.send = function (body) {
    res.responseBody = body;
    return originalSend.call(this, body);
  };

  // Listen for response finish event
  res.on('finish', () => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    const responseDetails = {
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      responseBody: res.responseBody,
      duration: `${duration}ms`,
      durationMs: duration,
      timestamp: new Date().toISOString()
    };

    // Log response
    console.log('\n========== RESPONSE ==========');
    console.log(`[${responseDetails.timestamp}] ${requestDetails.method} ${requestDetails.url}`);
    console.log(`Status: ${responseDetails.statusCode} ${responseDetails.statusMessage}`);
    
    if (responseDetails.responseBody) {
      // Limit response body logging to prevent huge logs
      const responseStr = JSON.stringify(responseDetails.responseBody, null, 2);
      if (responseStr.length > 1000) {
        console.log('Response Body:', responseStr.substring(0, 1000) + '... (truncated)');
      } else {
        console.log('Response Body:', responseStr);
      }
    }
    
    console.log(`Total Time: ${responseDetails.duration}`);
    console.log('=============================\n');
  });

  // Continue to next middleware
  next();
};

module.exports = requestLogger;

