#!/usr/bin/env node
import { program } from 'commander';

const genDiff = (path1, path2) => {
  return path1, path2;
}

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program.parse();

export default genDiff;