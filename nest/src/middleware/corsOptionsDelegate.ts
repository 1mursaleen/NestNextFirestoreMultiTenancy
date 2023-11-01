export const corsOptionsDelegate = (req, callback) => {
  const allowedOrigin = req.header('Origin');

  const corsOptions = {
    origin: allowedOrigin, // Set the allowed origin dynamically
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Origin',
      'Accept',
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Accept-Language',
      'Accept-Encoding',
      'Accept-Charset',
      'Referer',
      'User-Agent',
      'Cache-Control',
      'Pragma',
      'If-None-Match',
      'If-Modified-Since',
      'Special-Request-Header',
      // Add your custom headers here
    ],
  };

  callback(null, corsOptions);
};
