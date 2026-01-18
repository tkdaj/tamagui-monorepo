#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const appsDir = path.join(root, 'apps');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else if (/\.(js|ts|tsx|jsx)$/.test(e.name)) files.push(full);
  }
  return files;
}

function findImports(file) {
  const src = fs.readFileSync(file, 'utf8');
  const re = /import\s+(?:[^'";]+)\s+from\s+['"]([^'"]+)['"]|require\(['"]([^'"]+)['"]\)/g;
  const imports = [];
  let m;
  while ((m = re.exec(src))) {
    imports.push(m[1] || m[2]);
  }
  return imports;
}

function isUnderApps(p) {
  return p.split(path.sep).includes('apps');
}

if (!fs.existsSync(appsDir)) {
  console.log('No apps directory found.');
  process.exit(0);
}

const appFiles = walk(appsDir);
const errors = [];

for (const file of appFiles) {
  const relative = path.relative(root, file);
  // only check files under apps/<app>/src
  if (!/^apps\/[^\/]+\/.+/.test(relative)) continue;
  const importerApp = relative.split(path.sep)[1];
  const imports = findImports(file);
  for (const imp of imports) {
    if (!imp) continue;
    // handle relative imports
    if (imp.startsWith('.')) {
      const resolved = path.normalize(path.join(path.dirname(file), imp));
      // if resolved path is within repo, check if it goes into apps/<otherApp>
      const rel = path.relative(root, resolved);
      if (isUnderApps(rel)) {
        const parts = rel.split(path.sep);
        const targetApp = parts[1];
        if (targetApp && targetApp !== importerApp) {
          errors.push({ file: relative, imp, importerApp, targetApp });
        }
      }
    }
    // For bare imports that include apps/ path
    if (imp.includes('apps/')) {
      const parts = imp.split('apps/')[1].split('/');
      const targetApp = parts[0];
      if (targetApp && targetApp !== importerApp) {
        errors.push({ file: relative, imp, importerApp, targetApp });
      }
    }
  }
}

if (errors.length) {
  console.error('Cross-app import violations found:');
  for (const e of errors) {
    console.error(`- ${e.file} imports ${e.imp} (from app ${e.targetApp})`);
  }
  process.exit(2);
} else {
  console.log('No cross-app import violations found.');
}
