import * as migration_20261116_064336_initial from './20261116_064336_initial';
import * as migration_20261118_163100_technologies_skills_split from './20261118_163100_technologies_skills_split';

export const migrations = [
  {
    up: migration_20261116_064336_initial.up,
    down: migration_20261116_064336_initial.down,
    name: '20261116_064336_initial',
  },
  {
    up: migration_20261118_163100_technologies_skills_split.up,
    down: migration_20261118_163100_technologies_skills_split.down,
    name: '20261118_163100_technologies_skills_split',
  },
];
