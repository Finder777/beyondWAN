// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { glob } from 'glob';

// Find all HTML files in the 'public' and 'protected' directories
const allHtmlFiles = glob.sync('**/*.html', {
  cwd: __dirname, // Search from the project root
  ignore: ['build/**', 'node_modules/**'], // Exclude the build directory
});

// Create a mapping of file names to their full paths for Vite
const inputFiles = {};
allHtmlFiles.forEach(file => {
  // Replace the slashes with hyphens to create a flat output name.
  // Example: 'protected/functionCall.html' becomes 'protected-functionCall'
  const name = file.replace(/\.html$/, '').replace(/[/\\]/g, '-');
  inputFiles[name] = resolve(__dirname, file);
});

export default defineConfig({
  // The root is the directory from which Vite will serve your files in dev mode.
  // Since your HTML files are spread across the project, the project root is the correct choice.
  root: __dirname,

  // Configure the build process
  build: {
    // The output directory for the production build
    outDir: 'build',
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
