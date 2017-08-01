# Say hello to EZREAL
EZREAL (a.k.a. ESRL - Edge Service Rate Limiter) is simple rate limiting service for the Riot API for League of Legends, based on WebSockets.

## How it works
EZREAL acts as a WebSocket based server that accepts token requests and replies on the socket when a token is available, using Hierarchical Leaky Buckets.

token requests must respect the following JSON Schema
```
{
  type: 'object',
  properties: {
    endpoint: {
      type: 'string',
      description: 'Which endpoint we are asking a token for. This value must be in the endpoints defined in `config/constants.js`'
    },
    method: {
      type: 'string',
      enum: [ 'match', 'matchList', 'other' ]
      description: 'What method we are asking a token for'
    },
    id: {
      type: 'string'
      description: 'A unique identifier for this token request. If this exists, it will be copied in the token request reply'
    }
  },
  required: ['endpoint', 'method']
}

// e.g. this is valid
{
  endpoint: 'EUW1',
  method: 'match',
  id: 'someUniqueId'
}
```

## Note
This rate limiter is based on the `limiter` package on npm. It has a few flaws, especially around the hierarchical removal of tokens in the buckets. For instance, a token can be removed from the root bucket, while the other buckets are not available for withdrawal, which means that a token that has been granted can be stale when the other buckets are ready (i.e. a token request is granted while out of sync with at least one bucket, which can cause 429 issues)