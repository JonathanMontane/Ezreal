const { TokenBucket } = require('limiter');

const {
  endpoints,
  ENDPOINT_BURST_RATE,
  ENDPOINT_FILL_RATE,
  MATCH_METHOD_BURST_RATE,
  MATCH_METHOD_FILL_RATE,
  MATCHLIST_METHOD_BURST_RATE,
  MATCHLIST_METHOD_FILL_RATE,
  DEFAULT_METHOD_BURST_RATE,
  DEFAULT_METHOD_FILL_RATE
} = require('./config');

const rootBuckets = endpoints
  .map(endpoint => ({
    endpoint,
    rootBucket: new TokenBucket(ENDPOINT_BURST_RATE, ENDPOINT_FILL_RATE, 'second', null)
  }));

const buckets = rootBuckets.map(({ endpoint, rootBucket }) => ({
  endpoint,
  rootBucket,
  matchBucket: new TokenBucket(
    MATCH_METHOD_BURST_RATE, MATCH_METHOD_FILL_RATE, 'second', rootBucket
  ),
  matchListBucket: new TokenBucket(
    MATCHLIST_METHOD_BURST_RATE, MATCHLIST_METHOD_FILL_RATE, 'second', rootBucket
  ),
  defaultBucket: new TokenBucket(
    DEFAULT_METHOD_BURST_RATE, DEFAULT_METHOD_FILL_RATE, 'second', rootBucket
  )
}));

const bucketMap = buckets
  .reduce((obj, $buckets) => Object.assign(obj, { [$buckets.endpoint]: $buckets }), {});

const take = ({ endpoint, method }) => {
  if (!bucketMap[endpoint]) {
    return Promise.reject();
  }

  let bucket = bucketMap[endpoint].defaultBucket;
  if (method === 'match') {
    bucket = bucketMap[endpoint].matchBucket;
  } else if (method === 'matchList') {
    bucket = bucketMap[endpoint].matchListBucket;
  }

  return new Promise((resolve, reject) => {
    bucket.removeTokens(1, (err, remainingTokens) => {
      if (err) {
        console.log('got err when trying to remove token');
        return reject(err);
      }
      return resolve(remainingTokens);
    });
  });
};

module.exports = take;
