const fs = require('fs-extra');
const path = require('path');

const sourceDir = 'src';
const buildDir = 'build';
const staticConfigPath = 'staticwebapp.config.json'; // Path to your config file in the repo root

async function buildApp() {
  try {
    // 1. Clean the build directory if it exists
    console.log(`Cleaning existing build directory: ${buildDir}`);
    await fs.remove(buildDir);

    // 2. Copy the contents of src to the build directory
    console.log(`Copying '${sourceDir}' to '${buildDir}'...`);
    await fs.copy(sourceDir, buildDir);

    // 3. Copy staticwebapp.config.json to the build directory
    console.log(`Copying '${staticConfigPath}' to '${buildDir}'...`);
    await fs.copy(staticConfigPath, path.join(buildDir, staticConfigPath));

    console.log('Build successful!');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1); // Exit with a non-zero code to indicate failure
  }
}

buildApp();