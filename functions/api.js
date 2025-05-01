exports.handler = async (event, context) => {
  const fetch = require('node-fetch');
  const dotenv = require('dotenv');
  dotenv.config();

  const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const SITE_PASSWORD = process.env.SITE_PASSWORD;
  const TOKEN_SECRET = process.env.TOKEN_SECRET || 'default-secret'; // Fallback for local testing

  // Simple token generation (for demo; use JWT in production)
  const generateToken = () => {
    return Buffer.from(`${SITE_PASSWORD}:${Date.now()}`).toString('base64');
  };

  // Parse path from event
  const path = event.path.replace('/.netlify/functions/api', '');

  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  // Authentication endpoint
  if (path === '/auth' && event.httpMethod === 'POST') {
    try {
      const { password } = JSON.parse(event.body);
      if (password === SITE_PASSWORD) {
        const token = generateToken();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ token })
        };
      } else {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Incorrect password' })
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server error' })
      };
    }
  }

  // Check auth endpoint
  if (path === '/check-auth' && event.httpMethod === 'GET') {
    const authHeader = event.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token && token.includes(SITE_PASSWORD)) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ authenticated: true })
      };
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ authenticated: false })
      };
    }
  }

  // OpenAI proxy endpoint
  if (path === '/openai' && event.httpMethod === 'POST') {
    try {
      const authHeader = event.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not set');
      }

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: event.body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message })
      };
    }
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: 'Not Found' })
  };
};