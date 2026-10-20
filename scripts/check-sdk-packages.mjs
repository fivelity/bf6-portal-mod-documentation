#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const packages = ['bf6-portal-mod-types', 'bf6-portal-utils'];

async function getLatestVersion(packageName) {
  const response = await fetch(
    `https://registry.npmjs.org/${encodeURIComponent(packageName)}`,
    { signal: AbortSignal.timeout(15_000) },
  );

  if (!response.ok) {
    throw new Error(`npm registry returned ${response.status} for ${packageName}`);
  }

  const metadata = await response.json();
  const version = metadata['dist-tags']?.latest;
  if (typeof version !== 'string') {
    throw new Error(`npm registry did not provide a latest version for ${packageName}`);
  }

  return version;
}

const results = await Promise.all(packages.map(async (packageName) => {
  const installedMetadata = JSON.parse(
    await readFile(`node_modules/${packageName}/package.json`, 'utf8'),
  );
  const installedVersion = installedMetadata.version;
  const latestVersion = await getLatestVersion(packageName);

  if (installedVersion === latestVersion) {
    console.log(`[check:sdk-packages] ${packageName}@${installedVersion} is up to date.`);
    return null;
  }

  return `${packageName}: installed ${installedVersion}, latest ${latestVersion}`;
}));

const outdated = results.filter(Boolean);
if (outdated.length > 0) {
  console.error('\n[check:sdk-packages] SDK packages are out of date:');
  for (const item of outdated) console.error(`  - ${item}`);
  console.error('\nUpdate them with: pnpm update bf6-portal-mod-types bf6-portal-utils');
  process.exitCode = 1;
}
