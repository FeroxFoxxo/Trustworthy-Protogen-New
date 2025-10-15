require('dotenv').config();

let jsonCfg = {};

try {
  jsonCfg = require('./config.json');
} catch (_) {}

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

function get(key, fallback = undefined) {
  const env = process.env[key];

  if (env !== undefined && env !== '') {
    return env;
  }

  if (hasOwn(jsonCfg, key)) {
    return jsonCfg[key];
  }

  return fallback;
}

function getArray(key, fallback = []) {
  const value = get(key);

  if (Array.isArray(value)){
    return value;
  }

  if (typeof value === 'string') {
    return value.split(',').map(s => s.trim()).filter(Boolean);
  }

  return fallback;
}

function getRequired(key) {
  const v = get(key);

  if (!v) {
    throw new Error(`Missing config: ${key}`);
  }

  return v;
}

module.exports = { get, getArray, getRequired };