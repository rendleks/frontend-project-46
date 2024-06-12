import fs from 'fs';
import { cwd } from 'node:process';
import path from 'path';

export default (file1, file2) => {
  const pathToFiles = [
    path.resolve(file1),
    path.resolve(file2)
  ];

  return pathToFiles;
}