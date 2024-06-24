import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('plain object', () => {
  const file1 = path.join('__fixtures__', 'file1.json');
  const file2 = path.join('__fixtures__', 'file2.json');
  const plainData = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
  expect(gendiff(file1, file2)).toEqual(plainData);
});