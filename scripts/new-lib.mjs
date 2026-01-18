#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const name = process.argv[2];
if (!name) {
  console.error('Usage: node scripts/new-lib.mjs <lib-name>');
  process.exit(1);
}

const root = process.cwd();
const libDir = path.join(root, 'lib', name);
if (fs.existsSync(libDir)) {
  console.error('Lib already exists at', libDir);
  process.exit(1);
}

fs.mkdirSync(path.join(libDir, 'src'), { recursive: true });

const pkg = {
  name: `@my/lib-${name}`,
  private: true,
  type: 'module',
  main: 'dist/index.js',
  exports: {
    '.': {
      import: './src/index.ts',
    },
  },
  scripts: {
    build: 'tsc -p tsconfig.json',
    typecheck: 'tsc -p tsconfig.json --noEmit',
    lint: 'eslint src --ext .ts,.tsx',
    'lint:fix': 'eslint src --ext .ts,.tsx --fix',
    clean: 'rm -rf dist',
  },
};

fs.writeFileSync(path.join(libDir, 'package.json'), JSON.stringify(pkg, null, 2));

const tsconfig = {
  extends: '../../tsconfig.base.json',
  compilerOptions: {
    composite: true,
    outDir: 'dist',
    rootDir: 'src',
    declaration: true,
  },
  include: ['src'],
};
fs.writeFileSync(path.join(libDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));

fs.writeFileSync(path.join(libDir, 'src', 'index.ts'), 'export {}\n');

console.log('Created lib at', libDir);
