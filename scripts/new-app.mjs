#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const name = process.argv[2];
if (!name) {
  console.error('Usage: node scripts/new-app.mjs <app-name>');
  process.exit(1);
}

const root = process.cwd();
const appDir = path.join(root, 'apps', name);
if (fs.existsSync(appDir)) {
  console.error('App already exists at', appDir);
  process.exit(1);
}

fs.mkdirSync(path.join(appDir, 'src'), { recursive: true });

const pkg = {
  name,
  private: true,
  type: 'module',
  scripts: {
    dev: 'turbo dev',
    build: 'turbo build',
    start: 'turbo start',
    lint: 'eslint src --ext .ts,.tsx',
    'lint:fix': 'eslint src --ext .ts,.tsx --fix'
  }
};

fs.writeFileSync(path.join(appDir, 'package.json'), JSON.stringify(pkg, null, 2));
fs.writeFileSync(path.join(appDir, 'tsconfig.json'), JSON.stringify({ extends: '../../tsconfig.base.json', include: ['src'] }, null, 2));
fs.writeFileSync(path.join(appDir, 'src', 'index.tsx'), `import React from 'react';\nimport { createRoot } from 'react-dom/client';\n\nconst App = () => <div>Welcome to ${name}</div>;\n\nconst root = document.getElementById('root');\nif (root) createRoot(root).render(<App />);\n`);

console.log('Created app at', appDir);
