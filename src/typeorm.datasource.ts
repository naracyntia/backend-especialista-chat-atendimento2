import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

// Minimal .env loader to support CLI without dotenv
function loadEnv() {
  const root = process.cwd();
  const files = [
    '.env.development.local',
    '.env.local',
    '.env.development',
    '.env',
  ];
  for (const file of files) {
    const full = path.join(root, file);
    if (!fs.existsSync(full)) continue;
    const content = fs.readFileSync(full, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith('\'') && val.endsWith('\''))) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) {
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

import { UserEntity } from './user/interface/user.entity';
import { UserPreferencesEntity } from './user/interface/user-preferences.entity';

const host = process.env.DATABASE_HOST || 'localhost';
const database = process.env.DATABASE_NAME || 'postgres';
const port = parseInt(process.env.DATABASE_PORT || '5432', 10);
const username = process.env.DATABASE_USER || 'postgres';
const password = process.env.DATABASE_PASSWORD || '';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [UserEntity, UserPreferencesEntity],
  migrations: [path.join(__dirname, 'migration', '*{.ts,.js}')],
});
