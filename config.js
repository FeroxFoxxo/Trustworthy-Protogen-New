import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

function getDir(importMetaUrl) {
  const filename = fileURLToPath(importMetaUrl);
  return dirname(filename);
}

const baseDir = getDir(import.meta.url);

dotenv.config({ path: path.resolve(baseDir, '.env') });

function get(key) {
  return process.env[key];
}

function getArray(key) {
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
  const override = get('dataDir');
  return override || getDir(importMetaUrl);
}

export { getArray, getRequired, getDir, getDataDir };
