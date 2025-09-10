// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { glob } from 'glob';

const sourceDir = resolve(__dirname, 'src');

// Find all HTML files in the 'public' and 'protected' directories
const allHtmlFiles = glob.sync('**/*.html', {
  cwd: sourceDir, // Search from the source directory
  ignore: ['node_modules/**'],
});

// Create a mapping of file names to their full paths for Vite
const inputFiles = {};
allHtmlFiles.forEach(file => {
  // Replace the slashes with hyphens to create a flat output name.
  // Example: 'protected/functionCall.html' becomes 'protected-functionCall'
  const name = file.replace(/\.html$/, '').replace(/[/\\]/g, '-');
  inputFiles[name] = resolve(sourceDir, file);
});

export default defineConfig({
  // The root for the dev server is now the 'src' directory.
  root: 'src',

  // This is the config for the build process
  build: {
    // The output directory for the production build
    outDir: resolve(__dirname, 'build'),
    // It's a good practice to clear the build directory on each new build
    emptyOutDir: true,
    // Specify custom rollup options
    rollupOptions: {
      // Use the dynamically created input object to tell Vite which files to build
      input: inputFiles,
    },
  },

  // Configure the dev server
  server: {
    // Disable history API fallback for a multi-page application
    historyApiFallback: false,
  },
});
