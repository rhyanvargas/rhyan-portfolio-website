import * as migration_20261116_064336_initial from './20261116_064336_initial';
import * as migration_20261118_163100_technologies_skills_split from './20261118_163100_technologies_skills_split';
import * as migration_20261119_050000_portfolio_skills_catalog from './20261119_050000_portfolio_skills_catalog';

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
  {
    up: migration_20261119_050000_portfolio_skills_catalog.up,
    down: migration_20261119_050000_portfolio_skills_catalog.down,
    name: '20261119_050000_portfolio_skills_catalog',
  },
];
