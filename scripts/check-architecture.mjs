#!/usr/bin/env node
/**
 * Clean Architecture boundary checks.
 * Fails on forbidden dependency-rule violations and leftover feature-based roots.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const errors = [];

if (existsSync(join(ROOT, 'features'))) {
  errors.push('Banned feature-based folder still present: src/features');
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

function layerOf(fileRel) {
  const top = fileRel.split('/')[0];
  return top;
}

const INFRA_INTERNAL = [
  '@/infrastructure/http',
  '@/infrastructure/repositories',
  '@/infrastructure/storage',
  '@/infrastructure/api',
];

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).replaceAll('\\', '/');
  const src = readFileSync(file, 'utf8');
  const layer = layerOf(rel);

  for (const match of src.matchAll(IMPORT_RE)) {
    const spec = match[1];
    if (!spec.startsWith('@/')) continue;

    if (spec.startsWith('@/features')) {
      errors.push(`${rel}: leftover feature import '${spec}'`);
      continue;
    }

    if (layer === 'domain') {
      if (
        spec.startsWith('@/application') ||
        spec.startsWith('@/infrastructure') ||
        spec.startsWith('@/presentation') ||
        spec.startsWith('@/app') ||
        spec.startsWith('@/shared')
      ) {
        errors.push(`${rel}: domain must not import '${spec}'`);
      }
    }

    if (layer === 'application') {
      if (
        spec.startsWith('@/infrastructure') ||
        spec.startsWith('@/presentation') ||
        spec.startsWith('@/app') ||
        spec.startsWith('@/shared')
      ) {
        errors.push(`${rel}: application must not import '${spec}'`);
      }
    }

    if (layer === 'presentation') {
      for (const banned of INFRA_INTERNAL) {
        if (spec === banned || spec.startsWith(banned + '/')) {
          errors.push(
            `${rel}: presentation must not import infrastructure internals '${spec}' — use use cases / DI`,
          );
        }
      }
      // composition root wiring belongs in app/
      if (spec.startsWith('@/infrastructure/composition') || spec === '@/infrastructure') {
        errors.push(
          `${rel}: presentation must not import composition root '${spec}' — wire in app/providers`,
        );
      }
    }

    if (layer === 'shared') {
      if (
        spec.startsWith('@/domain') ||
        spec.startsWith('@/application') ||
        spec.startsWith('@/infrastructure') ||
        spec.startsWith('@/presentation') ||
        spec.startsWith('@/app') ||
        spec.startsWith('@/features')
      ) {
        errors.push(`${rel}: shared must not import layer '${spec}'`);
      }
    }
  }
}

const required = [
  'domain',
  'application',
  'infrastructure',
  'presentation',
  'app',
  'shared',
];
for (const d of required) {
  if (!existsSync(join(ROOT, d))) {
    errors.push(`Missing Clean Architecture layer: src/${d}`);
  }
}

if (errors.length) {
  console.error(
    `Architecture check failed (${errors.length}):\n` + errors.map((e) => `  - ${e}`).join('\n'),
  );
  process.exit(1);
}
console.log(`Architecture check passed (${walk(ROOT).length} files).`);
