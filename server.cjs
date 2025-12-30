const path = require('node:path');
const express = require('express');
const { createRequestHandler } = require('@remix-run/express');

const BUILD_DIR = path.join(__dirname, 'build');
const PUBLIC_DIR = path.join(__dirname, 'public');

const app = express();

// Serve static files from the public directory
app.use(express.static(PUBLIC_DIR, {
  maxAge: '1y',
  immutable: true,
}));

// Handle Remix requests
const build = require('./build/index.cjs');
app.all(
  '*',
  createRequestHandler({
    build,
    mode: process.env.NODE_ENV || 'production',
  })
);

const port = process.env.PORT || 8004;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

