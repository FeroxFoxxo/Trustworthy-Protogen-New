import dotenv from 'dotenv';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

let jsonCfg = {};

function getDir(importMetaUrl) {
  const filename = fileURLToPath(importMetaUrl);
  return dirname(filename);
}

const BASE_DIR = getDir(import.meta.url);

dotenv.config({ path: path.resolve(BASE_DIR, '.env') });

try {
  const cfgPath = path.resolve(BASE_DIR, 'config.json');

  if (fs.existsSync(cfgPath)) {
    const raw = fs.readFileSync(cfgPath, 'utf8');
    jsonCfg = JSON.parse(raw);
  }
} catch (_) {}

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

function get(key, fallback = undefined) {
  const env = process.env[key];

  if (env) {
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

function getDataDir(importMetaUrl) {
  const override = get('DATA_DIR');
  return override || getDir(importMetaUrl);
}

export { get, getArray, getRequired, getDir, getDataDir };
