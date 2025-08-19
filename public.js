#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Root path (SchemaGhost repo)
const repoRoot = __dirname;

// Standalone package.json
const standalonePkg = path.join(repoRoot, "package.json");
// Scoped package.json
const scopedPkg = path.join(repoRoot, "package.scoped.json");

function publishPackage(pkgPath) {
  console.log(`Publishing package from ${pkgPath}...`);
  execSync("npm publish --access public", { cwd: repoRoot, stdio: "inherit" });
}

function publishBoth() {
  console.log("\n📦 Publishing standalone package (schemaghost)...");
  publishPackage(standalonePkg);

  if (fs.existsSync(scopedPkg)) {
    console.log("\n📦 Publishing scoped package (@mock-verse/schemaghost)...");
    const backupPkg = path.join(repoRoot, "package.json.bak");

    // Backup original package.json
    fs.renameSync(standalonePkg, backupPkg);
    // Copy scoped package to package.json
    fs.copyFileSync(scopedPkg, standalonePkg);

    // Publish scoped package
    publishPackage(standalonePkg);

    // Restore original package.json
    fs.renameSync(backupPkg, standalonePkg);
  }

  console.log("\n✅ All packages published successfully!");
}

publishBoth();
