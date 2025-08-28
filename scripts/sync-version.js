const fs = require('fs');
const path = require('path');

// Read package.json
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

// Read package.scoped.json
const scopedPath = path.resolve(__dirname, '../package.scoped.json');
const scopedPkg = JSON.parse(fs.readFileSync(scopedPath, 'utf-8'));

// Sync version
scopedPkg.version = pkg.version;

// Write back
fs.writeFileSync(scopedPath, JSON.stringify(scopedPkg, null, 2));

console.log(`✅ Synced version ${pkg.version} to package.scoped.json`);
