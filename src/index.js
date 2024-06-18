import fs from 'fs';
import { cwd } from 'node:process';
import path from 'path';
import _ from 'lodash';

const readingFile = (pathToFile) => JSON.parse(fs.readFileSync(path.resolve(pathToFile)));

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2).sort();

  const result = keys.map((key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return {
          type: 'unchanged',
          key,
          value: data1[key]
        }
      } else {
        return {
          type: 'changed',
          key,
          value1: data1[key],
          value2: data2[key]
        }
      }
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        value: data1[key]
      }
    }

    if (!_.has(data1, key) && _.has(data2, key)) {
      return {
        type: 'added',
        key,
        value: data2[key]
      }
    }
  });

  return result;
};

const convertToString = (data, replacer = ' ', spacerCount = 1) => {
  const indent = replacer.repeat(spacerCount);
  const toString = data.reduce((acc, item) => {
    const { type, key, value, value2 } = item;
    // console.log(type, key);
    if (type === 'deleted') {
      acc += `${indent}- ${key}: ${value}\n`;
    }
    if (type === 'unchanged') {
      acc += `${indent}  ${key}: ${value}\n`;
    }
    if (type === 'added') {
      acc += `${indent}+ ${key}: ${value}\n`;
    }
    if (type === 'changed') {
      acc += `${indent}- ${key}: ${value}\n`;
      acc += `${indent}+ ${key}: ${value2}\n`;
    }
    return acc;
  }, '{\n');

  return toString + '}';
};

export default (file1, file2) => {
  const fileData1 = readingFile(file1);
  const fileData2 = readingFile(file2);

  return convertToString(genDiff(fileData1, fileData2));
};