#!/usr/bin/env node
/**
 * Feature-based architecture boundary checks.
 * Fails on: leftover FSD folders, deep cross-feature imports, shared→feature,
 * feature→app, relative escapes into other features, missing public barrels.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, normalize, resolve } from 'node:path';
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
  const m = fileRel.match(/^features\/([^/]+)/);
  return m ? m[1] : null;
}

function layerOf(fileRel) {
  return fileRel.split('/')[0];
}

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).replaceAll('\\', '/');
  const src = readFileSync(file, 'utf8');
  const fromFeature = featureOf(rel);
  const fromLayer = layerOf(rel);
  const fileDir = dirname(file);

  for (const match of src.matchAll(IMPORT_RE)) {
    const spec = match[1];

    if (spec.startsWith('@/')) {
      if (
        spec.startsWith('@/entities') ||
        spec.startsWith('@/widgets') ||
        spec.startsWith('@/pages')
      ) {
        errors.push(`${rel}: banned FSD import '${spec}'`);
        continue;
      }

      if (fromLayer === 'shared' && spec.startsWith('@/features')) {
        errors.push(`${rel}: shared must not import features ('${spec}')`);
      }

      if (fromLayer === 'features' && spec.startsWith('@/app')) {
        errors.push(`${rel}: features must not import app ('${spec}')`);
      }

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
      continue;
    }

    // Relative imports that escape into another feature
    if (spec.startsWith('.') && fromFeature) {
      const resolved = normalize(resolve(fileDir, spec));
      const resolvedRel = relative(ROOT, resolved).replaceAll('\\', '/');
      const toFeature = featureOf(resolvedRel);
      if (toFeature && toFeature !== fromFeature) {
        errors.push(
          `${rel}: relative cross-feature import '${spec}' → features/${toFeature} — use @/features/${toFeature}`,
        );
      }
    }
  }
}

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

if (!existsSync(join(ROOT, 'app', 'layout', 'index.ts'))) {
  errors.push('app/layout: missing public index.ts');
}

if (errors.length) {
  console.error(
    `Architecture check failed (${errors.length}):\n` + errors.map((e) => `  - ${e}`).join('\n'),
  );
  process.exit(1);
}
console.log(`Architecture check passed (${walk(ROOT).length} files).`);
