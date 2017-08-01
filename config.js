let endpoints = [
  'KR',
  'NA1',
  'EUW1',
  'EUN1',
  'LA1',
  'LA2',
  'OC1',
  'JP1',
  'TR1',
  'RU'
];

if (process.env.ENDPOINTS) {
  try {
    endpoints = JSON.parse(process.env.ENDPOINTS);
  } catch (e) {
    // do nothing
  }
}

// the default values are about 5-10% lower than the max dev values to try to protect us from
// request delay variations that could create inconsistent views of the token window between
// Riot and this limiter
const ENDPOINT_BURST_RATE = process.env.ENDPOINT_BURST_RATE || 15;
const ENDPOINT_FILL_RATE = process.env.ENDPOINT_FILL_RATE || 0.7;
const MATCH_METHOD_BURST_RATE = process.env.MATCH_METHOD_BURST_RATE || 48;
const MATCH_METHOD_FILL_RATE = process.env.MATCH_METHOD_FILL_RATE || 48;
const MATCHLIST_METHOD_BURST_RATE = process.env.MATCHLIST_METHOD_BURST_RATE || 96;
const MATCHLIST_METHOD_FILL_RATE = process.env.MATCHLIST_METHOD_FILL_RATE || 96;
const DEFAULT_METHOD_BURST_RATE = process.env.DEFAULT_METHOD_BURST_RATE || 1920;
const DEFAULT_METHOD_FILL_RATE = process.env.DEFAULT_METHOD_FILL_RATE || 1920;

module.exports = {
  endpoints,
  ENDPOINT_BURST_RATE,
  ENDPOINT_FILL_RATE,
  MATCH_METHOD_BURST_RATE,
  MATCH_METHOD_FILL_RATE,
  MATCHLIST_METHOD_BURST_RATE,
  MATCHLIST_METHOD_FILL_RATE,
  DEFAULT_METHOD_BURST_RATE,
  DEFAULT_METHOD_FILL_RATE
};
