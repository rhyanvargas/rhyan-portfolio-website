import * as migration_20261116_064336_initial from './20261116_064336_initial';

export const migrations = [
  {
    up: migration_20261116_064336_initial.up,
    down: migration_20261116_064336_initial.down,
    name: '20261116_064336_initial'
  },
];
