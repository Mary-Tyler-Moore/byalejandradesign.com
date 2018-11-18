exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const response = event.Records[0].cf.response;
  const headers = response.headers;

  if (request.uri.startsWith('/static/')) {
    headers['cache-control'] = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ];
  } else {
    headers['cache-control'] = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=0, must-revalidate',
      },
    ];
  }

  [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'X-Permitted-Cross-Domain-Policies',
      value: 'none',
    },
    {
      key: 'Referrer-Policy',
      value: 'no-referrer',
    },
    {
      key: 'X-Frame-Options',
      value: 'deny',
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block',
    },
  ].forEach((h) => (headers[h.key.toLowerCase()] = [h]));

  callback(null, response);
};
