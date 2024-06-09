#!/usr/bin/env node
import { program } from 'commander';

const genDiff = (path1, path2) => {
  return path1, path2;
}

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .option('-f, format [type]', 'output format');
program.parse();

export default genDiff;