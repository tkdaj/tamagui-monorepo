#!/usr/bin/env node
import { rmSync, existsSync, readdirSync } from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const args = process.argv.slice(2);
const removeNodeModules = args.includes('--all');

const targets = [
  'dist',
  'build',
  '.tanstack',
  '.turbo',
  '.next',
  'out',
  'storybook-static',
  'release',
];

function rm(p) {
  const full = path.join(repoRoot, p);
  if (existsSync(full)) {
    console.log('Removing', full);
    rmSync(full, { recursive: true, force: true });
  }
}

for (const t of targets) rm(t);

// Remove per-package build/dist folders
const packages = ['apps', 'lib', 'packages'];
for (const pkg of packages) {
  const base = path.join(repoRoot, pkg);
  try {
    const items = readdirSync(base, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    for (const name of items) {
      rm(path.join(pkg, name, 'dist'));
      rm(path.join(pkg, name, 'build'));
      rm(path.join(pkg, name, 'out'));
    }
  } catch (e) {
    // ignore missing folders
  }
}

if (removeNodeModules) {
  rm('node_modules');
  for (const pkg of packages) {
    try {
      const items = readdirSync(path.join(repoRoot, pkg), { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
      for (const name of items) rm(path.join(pkg, name, 'node_modules'));
    } catch {}
  }
}

console.log('Clean complete.');
