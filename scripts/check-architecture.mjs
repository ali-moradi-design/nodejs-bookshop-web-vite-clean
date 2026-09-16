#!/usr/bin/env node
/**
 * Feature-based architecture boundary checks.
 * Fails on: leftover FSD folders, deep cross-feature imports, banned layer imports.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const errors = [];

const BANNED_DIRS = ['entities', 'widgets', 'pages'];
for (const d of BANNED_DIRS) {
  if (existsSync(join(ROOT, d))) {
    errors.push(`Banned FSD folder still present: src/${d}`);
  }
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(p);
  }
  return out;
}

const IMPORT_RE = /from\s+['"]([^'"]+)['"]/g;

function featureOf(fileRel) {
  // features/<name>/...
  const m = fileRel.match(/^features\/([^/]+)/);
  return m ? m[1] : null;
}

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).replaceAll('\\', '/');
  const src = readFileSync(file, 'utf8');
  const fromFeature = featureOf(rel);

  for (const match of src.matchAll(IMPORT_RE)) {
    const spec = match[1];
    if (!spec.startsWith('@/')) continue;

    if (spec.startsWith('@/entities') || spec.startsWith('@/widgets') || spec.startsWith('@/pages')) {
      errors.push(`${rel}: banned FSD import '${spec}'`);
      continue;
    }

    // Deep cross-feature: @/features/other/something
    const fm = spec.match(/^@\/features\/([^/]+)(?:\/(.*))?$/);
    if (fm) {
      const toFeature = fm[1];
      const rest = fm[2];
      if (rest && rest !== '' && fromFeature !== toFeature) {
        errors.push(
          `${rel}: deep cross-feature import '${spec}' — use @/features/${toFeature}`,
        );
      }
    }
  }
}

// Every feature must have index.ts
const featuresRoot = join(ROOT, 'features');
if (existsSync(featuresRoot)) {
  for (const name of readdirSync(featuresRoot)) {
    const p = join(featuresRoot, name);
    if (!statSync(p).isDirectory()) continue;
    if (!existsSync(join(p, 'index.ts'))) {
      errors.push(`features/${name}: missing public index.ts`);
    }
  }
}

if (errors.length) {
  console.error(
    `Architecture check failed (${errors.length}):\n` + errors.map((e) => `  - ${e}`).join('\n'),
  );
  process.exit(1);
}
console.log(`Architecture check passed (${walk(ROOT).length} files).`);
