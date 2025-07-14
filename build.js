const fs = require('fs-extra');
const path = require('path');

const publicSourceDir = 'public';       // New public folder
const protectedSourceDir = 'protected'; // New protected folder
const buildDir = 'build';
const staticConfigPath = 'staticwebapp.config.json'; // Still at repo root

async function buildApp() {
  try {
    // 1. Clean the build directory
    console.log(`Cleaning existing build directory: ${buildDir}`);
    await fs.remove(buildDir);

    // 2. Copy public content to the root of the build directory
    console.log(`Copying '${publicSourceDir}' to '${buildDir}' (root content)...`);
    await fs.copy(publicSourceDir, buildDir);

    // 3. Copy protected content into a subfolder within build (e.g., build/protected/)
    // This is crucial for applying "authenticated" rules to a specific path.
    console.log(`Copying '${protectedSourceDir}' to '${buildDir}/${protectedSourceDir}'...`);
    await fs.copy(protectedSourceDir, path.join(buildDir, protectedSourceDir));

    // 4. Copy staticwebapp.config.json to the build directory root
    console.log(`Copying '${staticConfigPath}' to '${buildDir}/${staticConfigPath}'...`);
    await fs.copy(staticConfigPath, path.join(buildDir, staticConfigPath));

    console.log('Build successful!');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

buildApp();