#!/usr/bin/env node

import genDiff from '../index.js';

console.log(genDiff(process.argv[process.argv.length - 1]));